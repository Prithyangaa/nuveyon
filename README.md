# Polkadot Freelance Platform

## 💡 Overview
The **Polkadot Freelance Platform** is a decentralized web application (dApp) that allows employers and freelancers to manage work agreements through **smart contracts on Polkadot**. With built-in wallet authentication and role management, users can connect securely using the **Polkadot.js extension**, create or accept work contracts, and handle profile and notification management — all seamlessly integrated with the blockchain.

---

## ✨ Features

- 🔐 **Wallet Login**: Polkadot.js-based identity verification with no password needed.
- 👤 **User Profiles**: Store and update skills, education, and work experience.
- 🧑‍💼 **Role Management**: Promote to "employer" role to unlock contract creation.
- 📄 **Smart Contracts**: Real smart contracts written in **Ink!**, deployed via the Polkadot Contracts pallet.
- ✅ **Freelance Workflow**: Create, accept, and complete contracts securely.
- 🔔 **Notifications**: Real-time alerts for contracts and status changes.
- 📦 **Backend API**: Node.js + Express handles API routes and MongoDB storage.

---

## 🧱 Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| Frontend       | React.js (Vite), Bootstrap, Axios   |
| Backend        | Node.js, Express.js, MongoDB        |
| Smart Contracts| Ink! (Rust), cargo-contract          |
| Wallet         | Polkadot.js Extension               |
| Blockchain     | Polkadot Asset Hub / Westend Testnet|
| Hosting Tools  | GitHub, Crust IPFS, Local Contracts Node |

---

## 📂 Folder Structure

```
polkadot-mvp/
├── polkadot-mvp-frontend/      # React Frontend
│   └── src/
│       ├── components/         # Navbar, Modal, Footer
│       ├── pages/              # Home, Profile, Contracts, etc.
│       ├── services/           # API + smartContract.js + .contract
├── polkadot-mvp-backend/       # Express Backend
│   ├── routes/                 # Auth, Profile, Contracts, Notifications
│   ├── models/                 # MongoDB Schemas
│   └── server.js               # Server entry

```

---

## 📸 Screenshots

```
assets/
├── connect-wallet.png
├── contracts.png
├── profile.png
├── video-thumbnail.png
```

```md
![Connect Wallet](assets/Screenshot%202025-04-20%20102411.png)
![Profile Page](assets/Screenshot%202025-04-20%20102426.png)
![Update Profile](assets/Screenshot%202025-04-20%20102438.png)
![Contract Creation](assets/Screenshot%202025-04-20%20102447.png)
![Contract Display](assets/Screenshot%202025-04-20%20102456.png)
![Notifications](assets/Screenshot%202025-04-20%20102505.png)

```

---

## 🎥 Demo Video

```md
[![Watch the demo](assets/Screenshot%202025-04-20%20102505.png)](assets/nuveyon_demo.mp4)
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/polkadot-mvp.git
```

### 2. Backend Setup
```bash
cd polkadot-mvp/polkadot-mvp-backend
npm install
```
Create a `.env` file:
```
PORT=5000
MONGO_URI=your_mongodb_uri
```
Run the server:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd ../polkadot-mvp-frontend
npm install
npm run dev
```

### 4. Contract Deployment
```bash
cd ../work_contract
cargo +nightly contract build
```
Upload the generated `.contract` file (found in `target/ink/`) to:
- [Polkadot.js UI Contracts Tab](https://polkadot.js.org/apps)
- Or [Contracts UI](https://contracts-ui.substrate.io/)

> ⚠️ Save the deployed **contract address** and update it in your frontend `smartContract.js` file.

---

## 🔗 API Endpoints

**Connect Wallet:** `POST /api/auth/connect-wallet`
**Promote to Employer:** `POST /api/auth/promote`
**Update Profile:** `POST /api/profile/update`
**Create Contract:** `POST /api/contracts/create`
**Accept Contract:** `POST /api/contracts/accept`
**Fetch Contracts:** `GET /api/contracts?userId=`
**Notifications:** `GET /api/notifications/:polkadotId`

---

## 📝 To-Do / Improvements
- Smart contract payment flow
- Real asset payouts with DOT
- Chat between users
- Admin dashboard
- Profile ratings


