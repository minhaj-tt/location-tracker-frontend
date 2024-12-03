import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./Calendar.css";

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

  const peopleOptions = [
    "John Doe",
    "Jane Smith",
    "Alex Johnson",
    "Emily Davis",
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      const mockEvents = [
        {
          id: 1,
          title: "Team Meeting",
          start: "2024-12-05T10:00:00",
          end: "2024-12-05T11:00:00",
          attendees: ["Alice", "Bob"],
        },
        {
          id: 2,
          title: "Project Deadline",
          start: "2024-12-07T23:59:00",
          end: "2024-12-08T00:00:00",
          attendees: ["Charlie"],
        },
      ];
      setEvents(mockEvents);
    };
    fetchEvents();
  }, []);

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
  };

  const handleDateClick = (info) => {
    setNewEvent({ ...newEvent, start: info.dateStr });
    setIsDialogOpen(true);
  };

  const handleAddEvent = () => {
    const eventToAdd = {
      ...newEvent,
      id: events.length + 1,
      extendedProps: {
        attendees: newEvent.attendees,
      },
    };

    setEvents([...events, eventToAdd]);
    setIsDialogOpen(false);
    setNewEvent({ title: "", start: "", end: "", attendees: [] });
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;

    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== selectedEvent.id)
    );

    selectedEvent.remove();
    setSelectedEvent(null);
  };

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
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={(info) => handleEventClick(info)}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="80vh"
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          day: "Day",
        }}
        eventContent={(eventInfo) => (
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#008080",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              textAlign: "center",
              fontSize: "0.85rem",
              fontWeight: "bold",
            }}
          >
            {eventInfo.event.title}
          </Box>
        )}
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
        views={{
          timeGridWeek: {
            slotLabelFormat: {
              hour: "numeric",
              minute: "2-digit",
              hour12: false,
            },
            slotMinTime: "06:00:00",
            slotMaxTime: "22:00:00",
            contentHeight: "auto",
          },
          timeGridDay: {
            slotLabelFormat: {
              hour: "numeric",
              minute: "2-digit",
              hour12: false,
            },
            slotMinTime: "08:00:00",
            slotMaxTime: "20:00:00",
            contentHeight: "auto",
          },
        }}
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
                      <li key={index}>{attendee}</li>
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
                onClick={handleDeleteEvent}
              >
                Delete Event
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
              {peopleOptions.map((person, index) => (
                <MenuItem key={index} value={person}>
                  {person}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
    </Box>
  );
};

export default Calendar;
