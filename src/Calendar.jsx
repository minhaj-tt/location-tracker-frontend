import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  Typography,
  Button,
  Dialog,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./Calendar.css";
import axios from "axios";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    attendees: [],
  });
  const [users, setUsers] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [eventsFromAPI, setEventsFromAPI] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editEvent, setEditEvent] = useState({
    title: "",
    start: "",
    end: "",
    attendees: [],
  });

  const fetchEvents_ = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/events");
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData && userData.id) {
        const filteredEvents = response.data.events.filter((event) =>
          event.attendees.some((attendee) => attendee.id === userData.id)
        );
        setEventsFromAPI(filteredEvents);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents_();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/users"
        );
        const userData = JSON.parse(localStorage.getItem("userData"));

        const filteredUsers = response.data.users.filter(
          (user) => user.id !== userData?.id
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setEvents(eventsFromAPI);
  }, [eventsFromAPI]);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
  };

  const handleDateClick = (info) => {
    setNewEvent({ ...newEvent, start: info.dateStr });
    setIsDialogOpen(true);
  };

  const handleAddEvent = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData || !userData.id) {
      console.error("User ID not found in localStorage");
      return;
    }

    const eventToAdd = {
      title: newEvent.title,
      start: newEvent.start,
      end: newEvent.end,
      attendees: [
        ...newEvent.attendees
          .map((attendeeUsername) => {
            console.log("attendeeUsername", attendeeUsername);
            console.log("users", users);
            const user = users.find((user) => user.id === attendeeUsername);
            return user ? user.id : null;
          })
          .filter((id) => id !== null),
        userData.id,
      ],
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/events",
        eventToAdd
      );

      setEvents([...events, { ...response.data.event }]);
      setIsDialogOpen(false);
      setNewEvent({ title: "", start: "", end: "", attendees: [] });
      fetchEvents_();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleEditEvent = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData || !userData.id) {
      console.error("User ID not found in localStorage");
      return;
    }
    try {
      const updatedEvent = {
        ...editEvent,
        attendees: [
          ...editEvent.attendees
            .map((id) => {
              return id;
            })
            .filter((id) => id !== null),
        ],
      };

      const response = await axios.put(
        `http://localhost:3000/api/auth/events/${selectedEvent.id}`,
        updatedEvent
      );

      if (response.status === 200) {
        const updatedEvents = events.map((event) =>
          event.id === selectedEvent.id
            ? { ...event, ...response.data.event }
            : event
        );
        setEvents(updatedEvents);
        setIsEditDialogOpen(false);
        setSelectedEvent(null);
        fetchEvents_();
      } else {
        console.error("Failed to update event:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleEditEventClick = () => {
    if (selectedEvent) {
      const attendees = selectedEvent.extendedProps.attendees || [];
      console.log("attendees", attendees);
      setEditEvent({
        title: selectedEvent.title,
        start: selectedEvent.startStr,
        end: selectedEvent.endStr,
        attendees: attendees.map((user) => {
          return user.id;
        }),
      });
      setIsEditDialogOpen(true);
    }
  };

  // const handleDeleteEvent = () => {
  //   if (!selectedEvent) return;

  //   setEvents((prevEvents) =>
  //     prevEvents.filter((event) => event.id !== selectedEvent.id)
  //   );

  //   selectedEvent.remove();
  //   setSelectedEvent(null);
  // };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 3,
          color: "#008080",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Calendar
      </Typography>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={(info) => handleEventClick(info)}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        dayHeaders={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        height="80vh"
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
          list: "List",
        }}
        dayHeaderContent={(dayInfo) => (
          <Typography
            sx={{
              fontWeight: "bold",
              color: "#008080",
              textAlign: "center",
              fontSize: "1rem",
            }}
          >
            {dayInfo.text}
          </Typography>
        )}
      />

      {selectedEvent && (
        <Dialog
          open={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          PaperProps={{
            sx: { borderRadius: 3, padding: 2 },
          }}
        >
          <Box sx={{ position: "relative", width: 350 }}>
            <IconButton
              onClick={() => setSelectedEvent(null)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "#008080",
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ marginBottom: 2, color: "#008080", textAlign: "center" }}
            >
              Event Details
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Title:</strong> {selectedEvent.title}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Start:</strong>{" "}
              {new Date(selectedEvent.start).toLocaleString()}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>End:</strong>{" "}
              {new Date(selectedEvent.end).toLocaleString()}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              <strong>Attendees:</strong>{" "}
              {selectedEvent.extendedProps?.attendees?.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: "1.5em" }}>
                  {selectedEvent.extendedProps.attendees.map(
                    (attendee, index) => (
                      <li key={index}>{attendee.name}</li>
                    )
                  )}
                </ul>
              ) : (
                "No attendees"
              )}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                sx={{
                  color: "#f44336",
                  borderColor: "#f44336",
                  "&:hover": { backgroundColor: "#f44336", color: "white" },
                }}
                onClick={handleEditEventClick}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#008080",
                  color: "white",
                  "&:hover": { backgroundColor: "#008080" },
                }}
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Dialog>
      )}

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        PaperProps={{
          sx: { borderRadius: 3, padding: 2 },
        }}
      >
        <Box sx={{ width: 350 }}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: 2,
              color: "#008080",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Add New Event
          </Typography>
          <InputLabel sx={{ mb: 1 }}>Title</InputLabel>
          <TextField
            placeholder="Enter Title"
            fullWidth
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <InputLabel sx={{ mb: 1 }}>Start Date</InputLabel>
          <TextField
            type="datetime-local"
            fullWidth
            value={newEvent.start}
            onChange={(e) =>
              setNewEvent({ ...newEvent, start: e.target.value })
            }
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <InputLabel sx={{ mb: 1 }}>End Date</InputLabel>
          <TextField
            type="datetime-local"
            fullWidth
            value={newEvent.end}
            onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
            sx={{
              marginBottom: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <InputLabel sx={{ mb: 1 }}>Invite People</InputLabel>
          {loadingUsers ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 60,
              }}
            >
              <CircularProgress size={24} />
            </Box>
          ) : (
            <FormControl fullWidth sx={{ marginBottom: 3 }}>
              <Select
                multiple
                value={newEvent.attendees}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, attendees: e.target.value })
                }
                displayEmpty
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <em>Select People</em>
                </MenuItem>
                {users &&
                  users.map((person, index) => (
                    <MenuItem key={index} value={person.id}>
                      {person.username} ({person.email})
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
          <Button
            variant="contained"
            onClick={handleAddEvent}
            sx={{
              marginBottom: 1,
              backgroundColor: "#008080",
              color: "white",
              width: "100%",
              "&:hover": { backgroundColor: "#008080" },
            }}
          >
            Add Event
          </Button>
          <Button
            variant="outlined"
            onClick={() => setIsDialogOpen(false)}
            sx={{
              color: "red",
              borderColor: "red",
              width: "100%",
              "&:hover": { borderColor: "red", color: "red" },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Dialog>

      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        PaperProps={{
          sx: { borderRadius: 3, padding: 2 },
        }}
      >
        <Box sx={{ width: 350 }}>
          <Typography
            variant="h6"
            sx={{
              marginBottom: 2,
              color: "#008080",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Edit Event
          </Typography>
          <InputLabel sx={{ mb: 1 }}>Title</InputLabel>
          <TextField
            placeholder="Enter Title"
            fullWidth
            value={editEvent.title}
            onChange={(e) =>
              setEditEvent({ ...editEvent, title: e.target.value })
            }
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <InputLabel sx={{ mb: 1 }}>Start Date</InputLabel>
          <TextField
            type="datetime-local"
            fullWidth
            value={editEvent.start}
            onChange={(e) =>
              setEditEvent({ ...editEvent, start: e.target.value })
            }
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <InputLabel sx={{ mb: 1 }}>End Date</InputLabel>
          <TextField
            type="datetime-local"
            fullWidth
            value={editEvent.end}
            onChange={(e) =>
              setEditEvent({ ...editEvent, end: e.target.value })
            }
            sx={{
              marginBottom: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <InputLabel sx={{ mb: 1 }}>Invite People</InputLabel>
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <Select
              multiple
              value={editEvent.attendees}
              onChange={(e) =>
                setEditEvent({ ...editEvent, attendees: e.target.value })
              }
              displayEmpty
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem value="" disabled>
                <em>Select People</em>
              </MenuItem>
              {users &&
                users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.username} ({user.email})
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#008080",
                color: "white",
                "&:hover": { backgroundColor: "#008080" },
              }}
              onClick={handleEditEvent}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              sx={{
                color: "#f44336",
                borderColor: "#f44336",
                "&:hover": { backgroundColor: "#f44336", color: "white" },
              }}
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Calendar;
