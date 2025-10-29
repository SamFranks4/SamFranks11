* { box-sizing: border-box; margin: 0; padding: 0; font-family: Arial, sans-serif; }
body { display: flex; flex-direction: column; height: 100vh; background: #f5f5dc; }

/* HEADER */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #4F000B;
  color: #f5f5dc;
}
header h1 { flex: 1; font-size: 1.2rem; }
header input {
  padding: 0.5rem;
  border-radius: 5px;
  border: none;
  flex: 2;
  margin-right: 0.5rem;
}
header button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #720026;
  color: #f5f5dc;
  transition: background 0.3s;
}
header button:hover { background: #4F000B; }

/* LAYOUT */
.container { display: flex; flex: 1; min-height: calc(100vh - 70px); }

/* SIDEBAR */
aside {
  width: 200px;
  background: #4F000B;
  padding: 1rem;
  color: #f5f5dc;
}
#categoryList { list-style: none; }
#categoryList li {
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f5f5dc;
  transition: background 0.2s;
}
#categoryList li.active,
#categoryList li:hover { background: #720026; }
.deleteCatBtn {
  background: #f5f5dc;
  color: #720026;
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
}

/* MAIN / NOTES */
main { flex: 1; padding: 1rem; display: flex; flex-wrap: wrap; gap: 1rem; }
.note {
  background: #fff;
  padding: 1rem;
  border-radius: 5px;
  border-left: 5px solid #4F000B;
  cursor: pointer;
  position: relative;
  box-shadow: 0 0 5px rgba(79,0,11,0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}
.note:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 10px rgba(79,0,17,0.5);
}
.note h3 { margin-bottom: 0.5rem; color: #4F000B; }
.note p { margin: 0; font-size: 0.9rem; color: #333; }
.deleteBtn {
  position: absolute;
  top: 5px; right: 5px;
  background: #720026;
  color: #f5f5dc;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 14px;
  cursor: pointer;
  line-height: 20px;
  text-align: center;
  transition: background 0.3s;
}
.deleteBtn:hover { background: #4F000B; }

/* MODAL */
.modal {
  display: none;
  position: fixed;
  top:0; left:0; width:100%; height:100%;
  background: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #f5f5dc;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 300px;
  position: relative;
}
.modal-content input,
.modal-content textarea,
.modal-content select { width: 100%; padding:0.4rem; border: 1px solid #4F000B; border-radius:4px; }
.modal-content button { background:#4F000B; color:#f5f5dc; border:none; padding:0.5rem; border-radius:5px; cursor:pointer; }
.modal-content button:hover { background:#720026; }
.close { position:absolute; top:10px; right:15px; font-size:1.2rem; cursor:pointer; color:#720026; }
.close:hover { color:#720026; }
