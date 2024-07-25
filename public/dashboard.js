document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    const taskForm = document.getElementById('task-form');
    const goalForm = document.getElementById('goal-form');
    const startTimerButton = document.getElementById('start-timer');
    const pauseTimerButton = document.getElementById('pause-timer');
    const stopTimerButton = document.getElementById('stop-timer');
    const timeDisplay = document.getElementById('time-display');
    let timerInterval;
    let timerSeconds = 0;
  
    logoutButton.addEventListener('click', () => {
        
        window.location.href = '/'; 
        sessionStorage.clear();
      });
  
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const task = document.getElementById('task').value;
      const dueDate = document.getElementById('due-date').value;
      const priority = document.getElementById('priority').value;
      addTask(task, dueDate, priority);
    });
  
    goalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const goal = document.getElementById('goal').value;
      addGoal(goal);
    });
  
    startTimerButton.addEventListener('click', () => {
      startTimer();
    });
  
    pauseTimerButton.addEventListener('click', () => {
      pauseTimer();
    });
  
    stopTimerButton.addEventListener('click', () => {
      stopTimer();
    });
  
    function addTask(task, dueDate, priority) {
      const taskList = document.getElementById('task-list');
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `<span>${task}</span> <span>${dueDate}</span> <span>${priority}</span>`;
      taskList.appendChild(taskItem);
    }
  
    function addGoal(goal) {
      const goalList = document.getElementById('goal-list');
      const goalItem = document.createElement('li');
      goalItem.textContent = goal;
      goalList.appendChild(goalItem);
    }
  
    function startTimer() {
      timerInterval = setInterval(() => {
        timerSeconds++;
        updateTimeDisplay();
      }, 1000);
    }
  
    function pauseTimer() {
      clearInterval(timerInterval);
    }
  
    function stopTimer() {
      clearInterval(timerInterval);
      timerSeconds = 0;
      updateTimeDisplay();
    }
  
    function updateTimeDisplay() {
      const hours = Math.floor(timerSeconds / 3600);
      const minutes = Math.floor((timerSeconds % 3600) / 60);
      const seconds = timerSeconds % 60;
      timeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
  
    function pad(num) {
      return num.toString().padStart(2, '0');
    }
  
    // Fetch motivational quote
    fetch('/api/quote')
      .then(response => response.json())
      .then(data => {
        document.getElementById('quote').textContent = data.text;
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
      });
  
    // Fetch weather data
    fetch('/api/weather')
      .then(response => response.json())
      .then(data => {
        const weather = `Weather in ${data.name}: ${data.weather[0].description}, ${data.main.temp}°C`;
        document.getElementById('weather').textContent = weather;
      })
      .catch(error => {
        console.error('Error fetching weather:', error);
      });
  
    // Fetch calendar events
    fetch('/api/calendar')
      .then(response => response.json())
      .then(data => {
        const calendarEvents = document.getElementById('calendar-events');
        calendarEvents.innerHTML = '';
  
        if (data.length > 0) {
          data.forEach(event => {
            const li = document.createElement('li');
            const start = event.start.dateTime || event.start.date;
            li.textContent = `${start} - ${event.summary}`;
            calendarEvents.appendChild(li);
          });
        } else {
          calendarEvents.textContent = 'No upcoming events found.';
        }
      })
      .catch(error => {
        console.error('Error fetching calendar events:', error);
      });

    // Fetch user settings
    fetch('/api/settings')
        .then(response => response.json())
        .then(data => {
        // Process and display settings
        })
        .catch(error => {
        console.error('Error fetching settings:', error);
        });

    // Fetch analytics data
    fetch('/api/analytics')
        .then(response => response.json())
        .then(data => {
        // Process and display analytics
        console.log('Analytics data:', data);
        })
        .catch(error => {
        console.error('Error fetching analytics:', error);
        });

    // Initialize Google API Client
    function initClient() {
      gapi.client.init({
        apiKey: window.env.GOOGLE_API_KEY,
        clientId: window.env.GOOGLE_CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: "https://www.googleapis.com/auth/calendar.readonly"
      }).then(function () {
        loadCalendar();
      });
    }
  
    gapi.load('client:auth2', initClient);
  });
  