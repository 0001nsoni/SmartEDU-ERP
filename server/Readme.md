# 📗 SmartEdu ERP – API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication Headers

All protected APIs require the following headers:

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

## 🔐 Authentication Module

### 1. Register User

**POST** `/auth/register`

**Request:**
```json
{
  "name": "College Admin",
  "email": "admin@smartedu.com",
  "password": "123456",
  "role": "ADMIN",
  "institutionCode": "SMART001"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "userId": "..."
}
```

### 2. Login

**POST** `/auth/login`

**Request:**
```json
{
  "email": "admin@smartedu.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "...",
    "name": "College Admin",
    "role": "ADMIN"
  }
}
```

## 🏢 Institution Module

### 3. Create Institution (SUPER_ADMIN)

**POST** `/institutions`

**Request:**
```json
{
  "name": "SmartEdu College",
  "code": "SMART001",
  "address": "Jaipur"
}
```

**Response:**
```json
{
  "message": "Institution created successfully",
  "institution": {
    "_id": "...",
    "name": "SmartEdu College"
  }
}
```

## 👨‍🎓 Student Module

### 4. Create Student (ADMIN)

**POST** `/students`

**Request:**
```json
{
  "name": "Neeraj Soni",
  "email": "neeraj@student.com",
  "password": "123456",
  "enrollmentNo": "CS2025-001",
  "studentType": "HOSTELLER"
}
```

**Response:**
```json
{
  "message": "Student created successfully",
  "studentId": "..."
}
```

### 5. Get All Students (ADMIN)

**GET** `/students`

**Response:**
```json
{
  "students": [
    {
      "enrollmentNo": "CS2025-001",
      "studentType": "HOSTELLER",
      "userId": {
        "name": "Neeraj Soni",
        "email": "neeraj@student.com"
      }
    }
  ]
}
```

### 6. Get Own Profile (STUDENT)

**GET** `/students/me`

**Response:**
```json
{
  "student": {
    "enrollmentNo": "CS2025-001",
    "studentType": "HOSTELLER"
  }
}
```

## 👨‍🏫 Faculty Module

### 7. Create Faculty (ADMIN)

**POST** `/faculty`

**Request:**
```json
{
  "name": "Prof. Sharma",
  "email": "sharma@college.com",
  "password": "123456",
  "employeeId": "EMP1001",
  "facultyType": ["LECTURER"]
}
```

**Response:**
```json
{
  "message": "Faculty created successfully",
  "facultyId": "..."
}
```

### 8. Faculty Profile (FACULTY)

**GET** `/faculty/me`

**Response:**
```json
{
  "faculty": {
    "employeeId": "EMP1001",
    "facultyType": ["LECTURER"]
  }
}
```

## 🏨 Hostel Module

### 9. Create Hostel (ADMIN)

**POST** `/hostels`

```json
{
  "name": "A Block Hostel",
  "type": "BOYS"
}
```

### 10. Add Room (ADMIN)

**POST** `/hostels/{hostelId}/rooms`

```json
{
  "roomNumber": "101",
  "capacity": 3
}
```

### 11. Allocate Room (ADMIN)

**POST** `/hostels/{hostelId}/allocate`

```json
{
  "studentId": "...",
  "roomNumber": "101"
}
```

## 📝 Hostel Leave

### 12. Apply Leave (STUDENT)

**POST** `/hostel-leaves/apply`

```json
{
  "fromDate": "2026-02-01",
  "toDate": "2026-02-03",
  "reason": "Family Function"
}
```

### 13. Approve Leave (WARDEN)

**PATCH** `/hostel-leaves/{leaveId}`

```json
{
  "status": "APPROVED"
}
```

## 📢 Notice Board

### 14. Create Notice (ADMIN / FACULTY)

**POST** `/notices`

```json
{
  "title": "Hostel Fee Due",
  "message": "Pay before 10th Feb",
  "targetAudience": ["HOSTELLERS"]
}
```

### 15. View Notices

**GET** `/notices`

## 🎯 Club Management

### 16. Create Club (ADMIN)

**POST** `/clubs`

```json
{
  "name": "Coding Club",
  "description": "DSA & CP",
  "facultyInCharge": "FACULTY_ID"
}
```

### 17. Apply to Club (STUDENT)

**POST** `/clubs/{clubId}/apply`

### 18. Faculty Approval

**PATCH** `/clubs/faculty/{applicationId}`

```json
{
  "status": "PENDING_ADMIN"
}
```

### 19. Admin Approval

**PATCH** `/clubs/admin/{applicationId}`

```json
{
  "status": "APPROVED"
}
```

## 🚌 Transport Module

### 20. Create Route (ADMIN)

**POST** `/transport/routes`

```json
{
  "routeName": "Route A",
  "stops": [
    { "name": "Stop 1", "lat": 26.91, "lng": 75.78, "order": 1 }
  ]
}
```

### 21. Create Bus (ADMIN)

**POST** `/transport/buses`

```json
{
  "busNumber": "RJ14-BUS-01",
  "routeId": "ROUTE_ID"
}
```

### 22. Get Bus Route (STUDENT / FACULTY)

**GET** `/transport/bus/{busNumber}`

## 🚦 Real-Time Transport (Socket.IO)

**Emit Location (DRIVER)**
```javascript
socket.emit("bus:location", {
  busId,
  lat,
  lng
});
```

**Receive Location (STUDENT / FACULTY)**
```javascript
socket.on(`bus:${busId}:location`, (data) => {
  console.log(data);
});
```

## 🗓️ Timetable

### 23. Create Subject (ADMIN)

**POST** `/timetable/subjects`

```json
{
  "name": "Data Structures",
  "code": "CS201",
  "semester": 3,
  "facultyId": "FACULTY_ID"
}
```

### 24. Create Lecture (ADMIN)

**POST** `/timetable/lectures`

```json
{
  "subjectId": "SUBJECT_ID",
  "facultyId": "FACULTY_ID",
  "day": "Monday",
  "startTime": "10:00",
  "endTime": "11:00"
}
```

### 25. View Timetable

**GET** `/timetable`

## ✅ Attendance

### 26. Mark Student Attendance (FACULTY)

**POST** `/attendance/students`

```json
{
  "lectureId": "LECTURE_ID",
  "date": "2026-02-10",
  "records": [
    { "studentId": "STUDENT_ID", "status": "PRESENT" }
  ]
}
```

### 27. Student Attendance (STUDENT)

**GET** `/attendance/me`

### 28. Faculty Attendance

**POST** `/attendance/faculty`

```json
{
  "date": "2026-02-10",
  "inTime": "09:30",
  "outTime": "17:00"
}
```

---

## 🏁 End of API Documentation