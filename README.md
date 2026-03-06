# SHOPX — Angular Preliminary Laboratory Exam

A bold, editorial-styled Angular 17 shop management system with white, black & red design language. Features Login page, Dashboard Layout (Topbar + Sidebar + Content Area), and full CRUD for Products, My Orders, and Order History — powered by JSON Server.

---

## 🚀 Setup & Run

```bash
# Install dependencies
npm install

# Run Angular + JSON Server together
npm run dev
```

Open: **http://localhost:4200**

---

## 🔐 Login Credentials

| Field    | Value      |
|----------|------------|
| Username | `admin`    |
| Password | `admin123` |

---

## ✅ Features Checklist

- ✅ Login Page (UI + validation)
- ✅ Topbar (brand, user info, logout)
- ✅ Sidebar (Products, My Order, Order History with active state)
- ✅ Content Area (Router outlet)
- ✅ JSON Server (single user account in db/db.json)
- ✅ Products List — Full CRUD + Search
- ✅ My Order — Full CRUD + Search
- ✅ Order History — Full CRUD + Search

---

## 🎨 Design

Editorial Brutalist aesthetic — Bebas Neue display font, DM Sans body, bold black borders, red accents on white backgrounds.

---

## 🛠 Tech Stack

- Angular 17 (Standalone Components)
- Angular Router + Auth Guard
- HttpClient + JSON Server (port 3000)
- Bebas Neue + DM Sans + DM Mono (Google Fonts)
- Material Icons

---

## 📁 Project Structure

```
src/app/
├── components/
│   ├── login/         # Login page
│   ├── layout/        # Shell layout
│   ├── topbar/        # Top navigation
│   ├── sidebar/       # Side navigation
│   ├── products/      # Products CRUD
│   ├── my-order/      # Orders CRUD
│   └── order-history/ # History CRUD
├── guards/auth.guard.ts
├── models/models.ts
├── services/
│   ├── auth.service.ts
│   └── data.service.ts
db/db.json             # JSON Server database
```

---

*Preliminary Laboratory Exam — Angular Development*
