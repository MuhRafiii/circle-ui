🟣 circle-ui (Frontend)

📘 Deskripsi

Circle UI adalah bagian frontend dari aplikasi Circle, sebuah platform sosial mini berbasis web yang memungkinkan pengguna untuk membuat thread, membalas, menyukai, serta mengikuti pengguna lain. Aplikasi ini dibangun menggunakan React.js dengan arsitektur modular agar mudah dikembangkan dan dikelola.

🚀 Tech Stack
- React.js (Vite) — frontend framework utama
- Shadcn UI — untuk komponen UI yang elegan dan reusable
- Tailwind CSS — styling yang cepat dan responsif
- Context API / Redux Toolkit — manajemen state global
- Axios — komunikasi dengan backend
- Vercel — deployment frontend

📁 Struktur Folder
<pre>
  circle-ui/
  │
  ├── src/
  │   ├── components/      # Komponen UI reusable
  │   ├── pages/           # Halaman utama (Home, Thread Detail, Follows, dll)
  │   ├── contexts/        # Global state (AuthContext, ThreadContext)
  │   ├── hooks/           # Custom hooks
  │   ├── services/        # API call (axios)
  │   ├── store/           # Redux slices
  │   ├── types/           # TypeScript definitions (jika digunakan)
  │   └── utils/           # Helper functions
  │
  └── package.json
</pre>

💻 Fitur Utama

✅ Login & Register User  
✅ Create & Upload Thread (text + image)  
✅ Like & Reply pada Thread  
✅ Followers & Following List  
✅ Realtime Notification (WebSocket)  
✅ Optimistic Update untuk UX lebih responsif  

⚙️ Cara Menjalankan Project
<pre>
  # Clone repository
  git clone https://github.com/username/circle-ui.git
  cd circle-ui
  
  # Install dependencies
  npm install
  
  # Jalankan aplikasi
  npm run dev
</pre>

Frontend akan berjalan di:
👉 http://localhost:5173/

🌐 Deployment

  Aplikasi ini dideploy di Vercel dan terhubung langsung dengan API dari circle-api.

✨ Kontributor

👤 Muhammad Rafi  
📧 mrafi0603@gmail.com  

🚀 Dibuat sebagai bagian dari proyek Dumbways Bootcamp Stage 2
