# 📚 Library Management System

A simple Library Management System built with **Django (DRF) for backend** and **React for frontend**.

---

## 🚀 Features
- Admin can **Add, Update, Delete, and View** books.
- Users can **view all available books**.
- **Authentication system** (Signup/Login).
- **Image upload support** for books.
- RESTful API with Django REST Framework.
- Modern UI with React.

---

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/LibraryManagement-App.git
cd LibraryManagement-App
```

---

## Backend Setup (Django)

### 2️⃣ Navigate to Backend Directory
```sh
cd Backend/LibraryView
```

### 3️⃣ Create & Activate Virtual Environment
```sh
python -m venv venv  # Create virtual environment
venv\Scripts\activate  # Activate (Windows)
source venv/bin/activate  # Activate (Mac/Linux)
```

### 4️⃣ Install Dependencies
```sh
pip install -r requirements.txt
```

### 5️⃣ Run Migrations
```sh
python manage.py migrate
```

### 6️⃣ Create Superuser (Admin)
```sh
python manage.py createsuperuser
```

### 7️⃣ Start Backend Server
```sh
python manage.py runserver
```
💚 **Backend will start at:** `http://127.0.0.1:8000/`

---

## Frontend Setup (React)

### 8️⃣ Navigate to Frontend Directory
```sh
cd ../../Frontend
```

### 9️⃣ Install Dependencies
```sh
npm install
```

### 🔦 Start Frontend Server
```sh
npm start
```
💚 **Frontend will start at:** `http://localhost:3000/`

---

## 📝 API Endpoints
| Method  | Endpoint           | Description      |
|---------|--------------------|-----------------|
| **POST** | `/api/signup/`   | User Signup     |
| **POST** | `/api/login/`    | User Login      |
| **GET**  | `/api/books/`    | View all books  |
| **POST** | `/api/books/`    | Add a new book  |
| **PUT**  | `/api/books/:id/` | Update a book   |
| **DELETE** | `/api/books/:id/` | Delete a book |

---

## 📷 Image Upload
Ensure `MEDIA_URL` and `MEDIA_ROOT` are set in `settings.py`.  
Add this to `urls.py`:
```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
When sending an image via API, use **FormData**.

---

## 📌 Important Notes
- Make sure **MySQL/PostgreSQL** is installed and running.
- Update `DATABASES` in `settings.py` with your **database credentials**.
- Use **Postman** or **React frontend** to test API.

---

## 🎯 Happy Coding! 🚀
