import { useState, useEffect, useRef } from "react";

const BREEDS = {
  Köpek: ["Golden Retriever", "Labrador", "Poodle", "Bulldog", "Husky", "Beagle", "Chihuahua", "Rottweiler", "Dachshund", "Shih Tzu", "German Shepherd", "Border Collie", "Pomeranian", "Maltese", "Corgi", "Doberman", "Boxer", "Akita", "Chow Chow", "Dalmatian", "Samoyed", "Great Dane", "Bernese Mountain Dog", "Australian Shepherd", "French Bulldog"],
  Kedi: ["British Shorthair", "Persian", "Maine Coon", "Siamese", "Bengal", "Ragdoll", "Sphynx", "Scottish Fold", "Abyssinian", "Turkish Angora", "Turkish Van", "Burmese", "Russian Blue", "Norwegian Forest", "Birman", "Tonkinese", "Savannah", "American Shorthair", "Himalayan", "Devon Rex", "Cornish Rex", "Exotic Shorthair", "Chartreux", "Munchkin", "Siberian"],
  Kuş: ["Muhabbet Kuşu", "Papağan", "Kanarya", "Cennet Papağanı", "Jako", "Sultan Papağanı", "Sevda Papağanı", "Macaw", "Kakadu", "Conure", "Lori", "Amazon Papağanı", "Senegal Papağanı", "Forpus", "Senegalli", "Gökkuşağı İskeleti", "Hindistan Starling", "Zebra İskeleti", "Beo Kuşu", "Tukan"],
  Tavşan: ["Holland Lop", "Angora", "Rex", "Mini Rex", "Lionhead", "Dutch", "Flemish Giant", "Netherland Dwarf", "Mini Lop", "Californian", "New Zealand", "Harlequin", "Polish", "English Spot", "Himalayan"],
  Hamster: ["Suriye Hamster", "Cüce Hamster", "Roborovski", "Campbell", "Winter White", "Chinese Hamster"],
  Balık: ["Japon Balığı", "Beta Balığı", "Neon Tetra", "Kılıç Kuyruğu", "Disko Balığı", "Oscar", "Cichlid", "Guppy", "Molly", "Platy", "Angelfish", "Arowana", "Koi", "Clownfish", "Tang Balığı", "Puffer Balığı", "Zebra Danio", "Corydoras", "Loach", "Tetra"],
  Sürüngen: ["Sakallı Ejder", "Leopar Gekko", "Kral Yılanı", "Mısır Yılanı", "Yeşil Iguana", "Kameleon", "Mavi Dilli Skink", "Çöl Tortoisesi", "Kırmızı Kulaklı Su Kaplumbağası", "Timsah Gekko", "Boa Constrictor", "Ball Python", "Corn Snake", "Tegu", "Monitor"],
  Küçük_Memeliler: ["Degu", "Şinşila", "Gine Domuzu", "Kirpi", "Kokarca", "Su Samuru", "Fener Kesesi", "Sincap", "Çayır Köpeği", "Gelincik", "Dikkuyruklu Fare", "Sıçan", "Faresi", "Atlama Faresi", "Okapi"],
  At: ["Arap Atı", "İngiliz Safkanı", "Appaloosa", "Quarter Horse", "Friesian", "Andalusian", "Haflinger", "Morgan", "Mustang", "Tennessee Walking Horse", "Paint Horse", "Percheron", "Clydesdale", "Shetland Pony", "Welsh Pony"],
  Eşek_Katır: ["Standart Eşek", "Minyatür Eşek", "Mammoth Eşek", "Katır"],
  Keçi_Koyun: ["Cüce Keçi", "Boer Keçi", "Angora Keçi", "Nubian Keçi", "Merino Koyun", "Dorset Koyun", "Jacob Koyun", "Cotswold Koyun"],
  İnek_Dana: ["Mini Zebu", "Higland İneği", "Dexter İneği", "Jersey İneği"],
  Domuz: ["Mini Pig", "Potbelly Pig", "Kunekune", "Juliana Pig"],
  Deve_Lama: ["Lama", "Alpaka", "Vicuna", "Deve"],
  Ahtapot_Yengeç: ["Ahtapot", "Yengeç", "Kerevit", "Deniz Atı", "Deniz Yıldızı"],
  Böcek_Örümcek: ["Tarantula", "Kılıç Böceği", "Yaprak Böceği", "Gün Böceği", "Mantis", "Çöl Akrebi", "Kırkayak", "Milipede"],
  Ekzotik: ["Fennec Fox", "Serval", "Kaya Hyrax", "Kapibara", "Tenrec", "Degü", "Patagonia Mara", "Beyaz Kirpi", "Çizgili Skunk"],
};

const SPECIES_EMOJI = { Köpek: "🐶", Kedi: "🐱", Kuş: "🐦", Tavşan: "🐰", Hamster: "🐹", Balık: "🐟", Sürüngen: "🦎", Küçük_Memeliler: "🐭", At: "🐴", Eşek_Katır: "🫏", Keçi_Koyun: "🐐", İnek_Dana: "🐄", Domuz: "🐷", Deve_Lama: "🦙", Ahtapot_Yengeç: "🦀", Böcek_Örümcek: "🕷️", Ekzotik: "🦊" };

const AVATARS = ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮","🐷","🐸","🐙","🐧","🦆","🦋","🐢","🦎"];

const SAMPLE_POSTS = [
  { id: 1, userId: 2, text: "Bugün ilk kez parkta koştum! 🌳 Özgürlük bu olmalı!", likes: 12, comments: ["Süper görünüyorsun!", "Harika!"], time: "2 saat önce", image: "🌳" },
  { id: 2, userId: 3, text: "Mama vakti geldi mi? Ben hazırım! 🍖", likes: 8, comments: ["Hahaha çok tatlı", "Bizimki de aynısını yapıyor!"], time: "4 saat önce", image: "🍖" },
  { id: 3, userId: 4, text: "Yeni oyuncağımı kimseyle paylaşmıyorum 😤", likes: 20, comments: ["Oyuncak doğrultusunda haklısın!"], time: "5 saat önce", image: "🧸" },
];

const SAMPLE_USERS = [
  { id: 2, petName: "Pamuk", ownerName: "Ayşe K.", species: "Kedi", breed: "British Shorthair", age: 3, avatar: "🐱", bio: "Uyumayı ve pencereden bakmayı seviyorum 😴", friends: [1], posts: [1] },
  { id: 3, petName: "Karamel", ownerName: "Mehmet Y.", species: "Köpek", breed: "Golden Retriever", age: 2, avatar: "🐶", bio: "Top oynamak ve koşmak hayatımın anlamı! 🎾", friends: [], posts: [2] },
  { id: 4, petName: "Minnoş", ownerName: "Zeynep A.", species: "Kedi", breed: "Persian", age: 5, avatar: "🐈", bio: "Saçlarımın bakımına özen gösteriyorum 💅", friends: [], posts: [3] },
  { id: 5, petName: "Fırtına", ownerName: "Can B.", species: "Köpek", breed: "Husky", age: 1, avatar: "🐺", bio: "Kar yağmasını bekliyorum her gün ❄️", friends: [], posts: [] },
  { id: 6, petName: "Sarı", ownerName: "Elif D.", species: "Kuş", breed: "Kanarya", age: 2, avatar: "🐦", bio: "Sabahları herkesi uyandırmak benim işim 🎵", friends: [], posts: [] },
  { id: 7, petName: "Topaç", ownerName: "Ali R.", species: "Tavşan", breed: "Holland Lop", age: 1, avatar: "🐰", bio: "Havuç ve özgürlük! 🥕", friends: [], posts: [] },
  { id: 8, petName: "Drago", ownerName: "Kemal S.", species: "Sürüngen", breed: "Sakallı Ejder", age: 2, avatar: "🦎", bio: "Güneş lambası altında kral benim 👑", friends: [], posts: [] },
  { id: 9, petName: "Alpino", ownerName: "Sara M.", species: "At", breed: "Arap Atı", age: 4, avatar: "🐴", bio: "Özgürlük dörtnala koşmaktır 🌬️", friends: [], posts: [] },
  { id: 10, petName: "Kivi", ownerName: "Deniz Y.", species: "Küçük_Memeliler", breed: "Şinşila", age: 1, avatar: "🐭", bio: "Tüylerimin yumuşaklığına bayılıyorum 🤍", friends: [], posts: [] },
  { id: 11, petName: "Duman", ownerName: "Burak T.", species: "Ekzotik", breed: "Fennec Fox", age: 2, avatar: "🦊", bio: "Kulaklarım büyük ama kalbim daha büyük 🧡", friends: [], posts: [] },
  { id: 12, petName: "Coco", ownerName: "Lina P.", species: "Kuş", breed: "Macaw", age: 3, avatar: "🦜", bio: "Rengarenk dünyama hoş geldiniz 🌈", friends: [], posts: [] },
  { id: 13, petName: "Şeker", ownerName: "Hande K.", species: "Domuz", breed: "Mini Pig", age: 1, avatar: "🐷", bio: "Mini ama muazzam! 🌸", friends: [], posts: [] },
];

const MESSAGES_INIT = {
  "1-2": [
    { from: 2, text: "Merhaba! Seninle tanışmak güzel 🐾", time: "10:30" },
    { from: 1, text: "Selam! Ben de çok mutlu oldum!", time: "10:32" },
  ],
};

export default function PetSocial() {
  const [screen, setScreen] = useState("splash");
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(SAMPLE_USERS);
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [messages, setMessages] = useState(MESSAGES_INIT);
  const [activeTab, setActiveTab] = useState("feed");
  const [activeChatId, setActiveChatId] = useState(null);
  const [newMsg, setNewMsg] = useState("");
  const [newPost, setNewPost] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);
  const [notification, setNotification] = useState(null);
  const [matchFilter, setMatchFilter] = useState("all");
  const chatEndRef = useRef(null);

  const [form, setForm] = useState({
    petName: "", ownerName: "", species: "Köpek", breed: "", age: "", avatar: "🐾", bio: "", password: ""
  });

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatId, messages]);

  const register = () => {
    if (!form.petName || !form.ownerName || !form.breed || !form.age) {
      showNotif("❌ Lütfen tüm alanları doldurun!");
      return;
    }
    const newUser = {
      id: Date.now(),
      petName: form.petName,
      ownerName: form.ownerName,
      species: form.species,
      breed: form.breed,
      age: parseInt(form.age),
      avatar: form.avatar,
      bio: form.bio || "Merhaba! Ben yeniyim 🐾",
      friends: [],
      posts: [],
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setScreen("home");
    showNotif(`🎉 Hoş geldin ${form.petName}!`);
  };

  const sendFriendRequest = (toId) => {
    if (friendRequests.find(r => r.from === currentUser.id && r.to === toId)) {
      showNotif("⏳ İstek zaten gönderildi!");
      return;
    }
    setFriendRequests(prev => [...prev, { from: currentUser.id, to: toId }]);
    showNotif("✅ Arkadaşlık isteği gönderildi!");
  };

  const acceptFriendRequest = (fromId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) return { ...u, friends: [...u.friends, fromId] };
      if (u.id === fromId) return { ...u, friends: [...u.friends, currentUser.id] };
      return u;
    }));
    setCurrentUser(prev => ({ ...prev, friends: [...prev.friends, fromId] }));
    setFriendRequests(prev => prev.filter(r => !(r.from === fromId && r.to === currentUser.id)));
    showNotif("🎉 Arkadaş oldunuz!");
  };

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    const key = [currentUser.id, activeChatId].sort((a,b)=>a-b).join("-");
    const msg = { from: currentUser.id, text: newMsg, time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }) };
    setMessages(prev => ({ ...prev, [key]: [...(prev[key] || []), msg] }));
    setNewMsg("");
  };

  const addPost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      userId: currentUser.id,
      text: newPost,
      likes: 0,
      comments: [],
      time: "Az önce",
      image: ["🌟","🎾","🐾","🌈","🍖","🌸","⭐"][Math.floor(Math.random()*7)],
    };
    setPosts(prev => [post, ...prev]);
    setCurrentUser(prev => ({ ...prev, posts: [post.id, ...prev.posts] }));
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, posts: [post.id, ...u.posts] } : u));
    setNewPost("");
    showNotif("📝 Gönderi paylaşıldı!");
  };

  const likePost = (postId) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  const getUser = (id) => users.find(u => u.id === id) || SAMPLE_USERS.find(u => u.id === id);

  const myRequests = friendRequests.filter(r => r.to === currentUser?.id);
  const isFriend = (id) => currentUser?.friends?.includes(id);
  const hasSentReq = (id) => friendRequests.find(r => r.from === currentUser?.id && r.to === id);

  const matchedUsers = currentUser ? users.filter(u =>
    u.id !== currentUser.id &&
    (matchFilter === "all" ? u.breed === currentUser.breed : u.species === currentUser.species)
  ) : [];

  const getChatKey = (id) => [currentUser?.id, id].sort((a,b)=>a-b).join("-");

  if (screen === "splash") return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#FFF4E6 0%,#FFE0B2 50%,#FFCCBC 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Fredoka One','Comic Sans MS',cursive", position:"relative", overflow:"hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap'); *{box-sizing:border-box} @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}} @keyframes wiggle{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}} @keyframes pop{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}} @keyframes notif{0%{transform:translateY(-80px);opacity:0}15%,85%{transform:translateY(0);opacity:1}100%{transform:translateY(-80px);opacity:0}}`}</style>
      <div style={{ fontSize:100, animation:"float 2.5s ease-in-out infinite" }}>🐾</div>
      <h1 style={{ fontSize:56, color:"#E65100", margin:"10px 0 5px", letterSpacing:2 }}>Pet Social</h1>
      <p style={{ fontFamily:"Nunito", fontSize:18, color:"#BF360C", marginBottom:40 }}>Tüylü dostların sosyal dünyası 🌍</p>
      <div style={{ display:"flex", gap:20 }}>
        <button onClick={() => setScreen("login")} style={btn("#FF7043","#fff")}>Giriş Yap 🐾</button>
        <button onClick={() => setScreen("register")} style={btn("#66BB6A","#fff")}>Kayıt Ol 🎉</button>
      </div>
      <div style={{ position:"absolute", fontSize:40, bottom:30, left:"10%", animation:"wiggle 2s infinite" }}>🐶</div>
      <div style={{ position:"absolute", fontSize:40, bottom:50, right:"12%", animation:"wiggle 2.3s infinite" }}>🐱</div>
      <div style={{ position:"absolute", fontSize:30, top:40, left:"20%", animation:"float 3s infinite" }}>🐦</div>
      <div style={{ position:"absolute", fontSize:30, top:60, right:"18%", animation:"float 2.8s infinite" }}>🐰</div>
    </div>
  );

  if (screen === "login") return (
    <div style={authBg()}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap'); *{box-sizing:border-box} @keyframes pop{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}} @keyframes notif{0%{transform:translateY(-80px);opacity:0}15%,85%{transform:translateY(0);opacity:1}100%{transform:translateY(-80px);opacity:0}}`}</style>
      <div style={card()}>
        <div style={{ fontSize:60, textAlign:"center" }}>🐾</div>
        <h2 style={title()}>Pet Social'a Giriş</h2>
        <p style={{ fontFamily:"Nunito", color:"#888", textAlign:"center", marginBottom:20 }}>Evcil hayvanın adıyla giriş yap!</p>
        <input id="loginInput" style={input()} placeholder="🐾 Evcil hayvanın adı" onKeyDown={e => { if(e.key==="Enter"){ const found=users.find(u=>u.petName.toLowerCase()===e.target.value.toLowerCase()); if(found){setCurrentUser(found);setScreen("home");}else showNotif("❌ Kayıtlı hayvan bulunamadı!");}}} />
        <button style={btn("#FF7043","#fff","100%")} onClick={() => { const val=document.getElementById("loginInput").value; const found=users.find(u=>u.petName.toLowerCase()===val.toLowerCase()); if(found){setCurrentUser(found);setScreen("home");}else showNotif("❌ Kayıtlı hayvan bulunamadı!");}}>Giriş Yap 🚀</button>
        <button style={{...btn("#eee","#555","100%"), marginTop:10}} onClick={() => setScreen("splash")}>← Geri</button>
        {notification && <div style={notifStyle()}>{notification}</div>}
      </div>
    </div>
  );

  if (screen === "register") return (
    <div style={authBg()}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap'); *{box-sizing:border-box} @keyframes pop{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}} @keyframes notif{0%{transform:translateX(120%);opacity:0}15%,85%{transform:translateX(0);opacity:1}100%{transform:translateX(120%);opacity:0}}`}</style>
      <div style={card("640px")}>
        <div style={{ fontSize:50, textAlign:"center" }}>🎉</div>
        <h2 style={title()}>Yeni Hesap Oluştur</h2>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div><label style={label()}>Evcil Hayvanın Adı *</label><input style={input()} placeholder="örn: Pamuk" value={form.petName} onChange={e=>setForm({...form,petName:e.target.value})} /></div>
          <div><label style={label()}>Sahibinin Adı *</label><input style={input()} placeholder="Adınız Soyadınız" value={form.ownerName} onChange={e=>setForm({...form,ownerName:e.target.value})} /></div>
          <div><label style={label()}>Tür *</label><select style={input()} value={form.species} onChange={e=>setForm({...form,species:e.target.value,breed:""})}>{Object.keys(BREEDS).map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={label()}>Irk *</label><select style={input()} value={form.breed} onChange={e=>setForm({...form,breed:e.target.value})}><option value="">Seçiniz...</option>{(BREEDS[form.species]||[]).map(b=><option key={b}>{b}</option>)}</select></div>
          <div><label style={label()}>Yaş *</label><input style={input()} placeholder="Yaş (yıl)" type="number" min="0" max="30" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} /></div>
          <div><label style={label()}>Avatar Emoji</label><select style={input()} value={form.avatar} onChange={e=>setForm({...form,avatar:e.target.value})}>{AVATARS.map(a=><option key={a} value={a}>{a}</option>)}</select></div>
        </div>
        <div><label style={label()}>Hakkında</label><textarea style={{...input(),height:70,resize:"none"}} placeholder="Kendinizi tanıtın..." value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} /></div>
        <div style={{ background:"#FFF3E0", borderRadius:12, padding:12, fontFamily:"Nunito", fontSize:13, color:"#E65100" }}>{form.avatar} {form.petName||"?"} · {form.species&&SPECIES_EMOJI[form.species]} {form.species} · {form.breed||"Irk seçilmedi"}</div>
        <button style={btn("#66BB6A","#fff","100%")} onClick={register}>🎉 Kayıt Ol!</button>
        <button style={{...btn("#eee","#555","100%"),marginTop:10}} onClick={() => setScreen("splash")}>← Geri</button>
        {notification && <div style={notifStyle()}>{notification}</div>}
      </div>
    </div>
  );

  const me = currentUser;
  const myPosts = posts.filter(p => me.posts?.includes(p.id) || p.userId === me.id);
  const feedPosts = posts;

  return (
    <div style={{ minHeight:"100vh", background:"#FFF8F0", fontFamily:"Nunito, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap'); *{box-sizing:border-box} ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:#fff3e0} ::-webkit-scrollbar-thumb{background:#FFB74D;border-radius:3px} @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}} @keyframes pop{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}} @keyframes slideUp{0%{transform:translateY(20px);opacity:0}100%{transform:translateY(0);opacity:1}} @keyframes notif{0%{transform:translateX(120%);opacity:0}15%,85%{transform:translateX(0);opacity:1}100%{transform:translateX(120%);opacity:0}} .tab-btn:hover{opacity:0.85;transform:scale(1.05)} .post-card:hover{box-shadow:0 8px 25px rgba(255,112,67,0.15);transform:translateY(-2px)} .user-card:hover{box-shadow:0 8px 25px rgba(255,112,67,0.15);transform:translateY(-2px)} .action-btn:hover{opacity:0.85;transform:scale(1.03)}`}</style>

      <div style={{ background:"linear-gradient(90deg,#FF7043,#FF8A65)", padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, boxShadow:"0 3px 15px rgba(255,112,67,0.3)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:28 }}>🐾</span>
          <span style={{ fontFamily:"Fredoka One", fontSize:26, color:"#fff", letterSpacing:1 }}>Pet Social</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {myRequests.length > 0 && <div style={{ background:"#fff", color:"#FF7043", borderRadius:20, padding:"4px 12px", fontSize:13, fontWeight:800 }}>🔔 {myRequests.length} istek</div>}
          <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.25)", borderRadius:25, padding:"6px 14px", cursor:"pointer" }} onClick={() => setActiveTab("profile")}>
            <span style={{ fontSize:22 }}>{me.avatar}</span>
            <span style={{ color:"#fff", fontWeight:800, fontSize:14 }}>{me.petName}</span>
          </div>
          <button onClick={() => { setCurrentUser(null); setScreen("splash"); }} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", borderRadius:20, padding:"6px 14px", cursor:"pointer", fontFamily:"Nunito", fontWeight:700, fontSize:13 }}>Çıkış</button>
        </div>
      </div>

      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"#fff", boxShadow:"0 -3px 15px rgba(0,0,0,0.1)", display:"flex", zIndex:100 }}>
        {[{id:"feed",icon:"🏠",label:"Ana Sayfa"},{id:"match",icon:"🔍",label:"Eşleş"},{id:"friends",icon:"🐾",label:"Arkadaşlar"},{id:"chat",icon:"💬",label:"Sohbet"},{id:"profile",icon:"⭐",label:"Profil"}].map(t => (
          <button key={t.id} className="tab-btn" onClick={() => { setActiveTab(t.id); setActiveChatId(null); }} style={{ flex:1, border:"none", background:activeTab===t.id?"#FFF3E0":"transparent", padding:"10px 0", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2, transition:"all 0.2s", color:activeTab===t.id?"#FF7043":"#aaa", position:"relative" }}>
            <span style={{ fontSize:22 }}>{t.icon}</span>
            <span style={{ fontSize:10, fontWeight:700 }}>{t.label}</span>
            {t.id==="friends" && myRequests.length>0 && <div style={{ position:"absolute", top:6, right:"28%", background:"#F44336", color:"#fff", borderRadius:"50%", width:16, height:16, fontSize:10, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800 }}>{myRequests.length}</div>}
          </button>
        ))}
      </div>

      {notification && <div style={{ position:"fixed", top:80, right:20, background:"#fff", border:"3px solid #FF7043", borderRadius:16, padding:"12px 20px", fontWeight:800, color:"#E65100", zIndex:999, boxShadow:"0 5px 20px rgba(255,112,67,0.3)", animation:"notif 2.5s ease forwards" }}>{notification}</div>}

      <div style={{ maxWidth:650, margin:"0 auto", padding:"20px 16px 90px" }}>

        {activeTab==="feed" && (
          <div style={{ animation:"slideUp 0.3s ease" }}>
            <div style={{ background:"#fff", borderRadius:20, padding:18, marginBottom:18, boxShadow:"0 3px 15px rgba(0,0,0,0.06)" }}>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ fontSize:40 }}>{me.avatar}</div>
                <div style={{ flex:1 }}>
                  <textarea value={newPost} onChange={e=>setNewPost(e.target.value)} style={{ width:"100%", border:"2px solid #FFE0B2", borderRadius:14, padding:12, fontFamily:"Nunito", fontSize:14, resize:"none", height:80, outline:"none" }} placeholder={`${me.petName} olarak bir şeyler paylaş... 🐾`} />
                  <button className="action-btn" onClick={addPost} style={btn("#FF7043","#fff")}>Paylaş 🚀</button>
                </div>
              </div>
            </div>
            {feedPosts.map(post => {
              const poster = getUser(post.userId);
              if(!poster) return null;
              return (
                <div key={post.id} className="post-card" style={{ background:"#fff", borderRadius:20, padding:18, marginBottom:14, boxShadow:"0 3px 12px rgba(0,0,0,0.06)", transition:"all 0.2s" }}>
                  <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
                    <div style={{ fontSize:40 }}>{poster.avatar}</div>
                    <div>
                      <div style={{ fontWeight:800, fontSize:16, color:"#333" }}>{poster.petName}</div>
                      <div style={{ fontSize:12, color:"#aaa" }}>{SPECIES_EMOJI[poster.species]} {poster.breed} · {post.time}</div>
                    </div>
                  </div>
                  <div style={{ fontSize:60, textAlign:"center", padding:"10px 0", background:"#FFF8F0", borderRadius:16, marginBottom:10 }}>{post.image}</div>
                  <p style={{ fontSize:15, color:"#444", margin:"0 0 12px" }}>{post.text}</p>
                  <div style={{ display:"flex", gap:10 }}>
                    <button className="action-btn" onClick={() => likePost(post.id)} style={{...btn("#FFF3E0","#FF7043"),border:"2px solid #FFE0B2"}}>❤️ {post.likes}</button>
                    <button className="action-btn" style={{...btn("#F3F0FF","#7C4DFF"),border:"2px solid #EDE7F6"}}>💬 {post.comments.length}</button>
                  </div>
                  {post.comments.length>0 && <div style={{ marginTop:10, paddingTop:10, borderTop:"1px solid #f0f0f0" }}>{post.comments.map((c,i)=><div key={i} style={{ fontSize:13, color:"#666", padding:"4px 0" }}>🐾 {c}</div>)}</div>}
                </div>
              );
            })}
          </div>
        )}

        {activeTab==="match" && (
          <div style={{ animation:"slideUp 0.3s ease" }}>
            <div style={{ background:"linear-gradient(135deg,#FF7043,#FF8A65)", borderRadius:20, padding:20, marginBottom:18, color:"#fff", textAlign:"center" }}>
              <div style={{ fontSize:50, marginBottom:5 }}>🔍</div>
              <h2 style={{ fontFamily:"Fredoka One", fontSize:24, margin:"0 0 5px" }}>Eşleşme Bul</h2>
              <p style={{ fontSize:14, opacity:0.9, margin:0 }}>{me.petName} · {SPECIES_EMOJI[me.species]} {me.breed}</p>
            </div>
            <div style={{ display:"flex", gap:10, marginBottom:18 }}>
              {["all","species"].map(f=>(
                <button key={f} onClick={()=>setMatchFilter(f)} style={{ flex:1, padding:"10px", borderRadius:14, border:"2px solid", borderColor:matchFilter===f?"#FF7043":"#eee", background:matchFilter===f?"#FFF3E0":"#fff", color:matchFilter===f?"#FF7043":"#aaa", fontFamily:"Nunito", fontWeight:800, cursor:"pointer", fontSize:14 }}>
                  {f==="all"?`🎯 Aynı Irk (${users.filter(u=>u.id!==me.id&&u.breed===me.breed).length})`:`${SPECIES_EMOJI[me.species]} Aynı Tür (${users.filter(u=>u.id!==me.id&&u.species===me.species).length})`}
                </button>
              ))}
            </div>
            {matchedUsers.length===0 ? (
              <div style={{ textAlign:"center", padding:40, background:"#fff", borderRadius:20 }}>
                <div style={{ fontSize:60 }}>😢</div>
                <p style={{ color:"#aaa", fontWeight:700 }}>Henüz eşleşme bulunamadı!</p>
              </div>
            ) : matchedUsers.map(u=>(
              <div key={u.id} className="user-card" style={{ background:"#fff", borderRadius:20, padding:18, marginBottom:12, boxShadow:"0 3px 12px rgba(0,0,0,0.06)", transition:"all 0.2s" }}>
                <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                  <div style={{ fontSize:52, background:"#FFF3E0", borderRadius:"50%", width:70, height:70, display:"flex", alignItems:"center", justifyContent:"center" }}>{u.avatar}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800, fontSize:18, color:"#333" }}>{u.petName}</div>
                    <div style={{ fontSize:13, color:"#888" }}>{SPECIES_EMOJI[u.species]} {u.species} · {u.breed} · {u.age} yaş</div>
                    <div style={{ fontSize:12, color:"#aaa" }}>Sahibi: {u.ownerName}</div>
                    {u.breed===me.breed && <div style={{ background:"#E8F5E9", color:"#2E7D32", borderRadius:8, padding:"3px 10px", fontSize:11, fontWeight:800, display:"inline-block", marginTop:4 }}>✨ Aynı ırk!</div>}
                  </div>
                </div>
                <p style={{ fontSize:13, color:"#666", margin:"10px 0" }}>{u.bio}</p>
                <div style={{ display:"flex", gap:8 }}>
                  {isFriend(u.id) ? <button style={{...btn("#E8F5E9","#2E7D32"),border:"2px solid #C8E6C9"}}>✅ Arkadaşsınız</button>
                  : hasSentReq(u.id) ? <button style={{...btn("#FFF3E0","#FF7043"),border:"2px solid #FFE0B2"}}>⏳ İstek Gönderildi</button>
                  : <button className="action-btn" onClick={()=>sendFriendRequest(u.id)} style={btn("#FF7043","#fff")}>🐾 Arkadaş Ekle</button>}
                  {isFriend(u.id) && <button className="action-btn" onClick={()=>{setActiveChatId(u.id);setActiveTab("chat");}} style={btn("#7C4DFF","#fff")}>💬 Mesaj</button>}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab==="friends" && (
          <div style={{ animation:"slideUp 0.3s ease" }}>
            {myRequests.length>0 && (
              <div style={{ background:"#fff", borderRadius:20, padding:18, marginBottom:16, boxShadow:"0 3px 12px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontFamily:"Fredoka One", color:"#FF7043", margin:"0 0 12px", fontSize:18 }}>🔔 Arkadaşlık İstekleri</h3>
                {myRequests.map(req=>{
                  const sender=getUser(req.from);
                  return sender?(
                    <div key={req.from} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid #f5f5f5" }}>
                      <div style={{ fontSize:36 }}>{sender.avatar}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:800 }}>{sender.petName}</div>
                        <div style={{ fontSize:12, color:"#aaa" }}>{SPECIES_EMOJI[sender.species]} {sender.breed}</div>
                      </div>
                      <button className="action-btn" onClick={()=>acceptFriendRequest(req.from)} style={btn("#66BB6A","#fff")}>✅ Kabul</button>
                      <button className="action-btn" onClick={()=>setFriendRequests(prev=>prev.filter(r=>!(r.from===req.from&&r.to===me.id)))} style={btn("#eee","#555")}>❌</button>
                    </div>
                  ):null;
                })}
              </div>
            )}
            <div style={{ background:"#fff", borderRadius:20, padding:18, boxShadow:"0 3px 12px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontFamily:"Fredoka One", color:"#FF7043", margin:"0 0 12px", fontSize:18 }}>🐾 Arkadaşlarım ({me.friends?.length||0})</h3>
              {(!me.friends||me.friends.length===0)?(
                <div style={{ textAlign:"center", padding:30 }}>
                  <div style={{ fontSize:50 }}>🐾</div>
                  <p style={{ color:"#aaa", fontWeight:700 }}>Henüz arkadaşın yok!</p>
                  <button className="action-btn" onClick={()=>setActiveTab("match")} style={btn("#FF7043","#fff")}>🔍 Eşleşme Bul</button>
                </div>
              ):me.friends.map(fid=>{
                const friend=getUser(fid);
                return friend?(
                  <div key={fid} className="user-card" style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:"1px solid #f5f5f5", transition:"all 0.2s" }}>
                    <div style={{ fontSize:42 }}>{friend.avatar}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:800, fontSize:16 }}>{friend.petName}</div>
                      <div style={{ fontSize:12, color:"#aaa" }}>{SPECIES_EMOJI[friend.species]} {friend.breed} · {friend.age} yaş</div>
                    </div>
                    <button className="action-btn" onClick={()=>{setActiveChatId(fid);setActiveTab("chat");}} style={btn("#7C4DFF","#fff")}>💬 Mesaj</button>
                  </div>
                ):null;
              })}
            </div>
          </div>
        )}

        {activeTab==="chat" && !activeChatId && (
          <div style={{ animation:"slideUp 0.3s ease" }}>
            <div style={{ background:"linear-gradient(135deg,#7C4DFF,#9C27B0)", borderRadius:20, padding:20, marginBottom:18, color:"#fff", textAlign:"center" }}>
              <div style={{ fontSize:50 }}>💬</div>
              <h2 style={{ fontFamily:"Fredoka One", fontSize:24, margin:"5px 0 0" }}>Sohbetler</h2>
            </div>
            {(!me.friends||me.friends.length===0)?(
              <div style={{ textAlign:"center", padding:40, background:"#fff", borderRadius:20 }}>
                <div style={{ fontSize:60 }}>💬</div>
                <p style={{ color:"#aaa", fontWeight:700 }}>Mesaj atmak için önce arkadaş ekle!</p>
                <button className="action-btn" onClick={()=>setActiveTab("match")} style={btn("#FF7043","#fff")}>🔍 Arkadaş Bul</button>
              </div>
            ):me.friends.map(fid=>{
              const friend=getUser(fid);
              if(!friend) return null;
              const key=getChatKey(fid);
              const chatMsgs=messages[key]||[];
              const last=chatMsgs[chatMsgs.length-1];
              return (
                <div key={fid} className="user-card" onClick={()=>setActiveChatId(fid)} style={{ background:"#fff", borderRadius:18, padding:16, marginBottom:10, boxShadow:"0 3px 12px rgba(0,0,0,0.06)", display:"flex", gap:12, alignItems:"center", cursor:"pointer", transition:"all 0.2s" }}>
                  <div style={{ fontSize:44 }}>{friend.avatar}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800, fontSize:16 }}>{friend.petName}</div>
                    <div style={{ fontSize:13, color:"#aaa" }}>{last?last.text.substring(0,30)+(last.text.length>30?"...":""):"Henüz mesaj yok"}</div>
                  </div>
                  <div style={{ fontSize:20 }}>›</div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab==="chat" && activeChatId && (()=>{
          const friend=getUser(activeChatId);
          const key=getChatKey(activeChatId);
          const chatMsgs=messages[key]||[];
          return (
            <div style={{ animation:"slideUp 0.3s ease" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, background:"#fff", borderRadius:20, padding:14, marginBottom:14, boxShadow:"0 3px 12px rgba(0,0,0,0.06)" }}>
                <button onClick={()=>setActiveChatId(null)} style={{ background:"#FFF3E0", border:"none", borderRadius:12, padding:"8px 12px", cursor:"pointer", fontWeight:800, color:"#FF7043" }}>←</button>
                <div style={{ fontSize:40 }}>{friend.avatar}</div>
                <div>
                  <div style={{ fontWeight:800, fontSize:16 }}>{friend.petName}</div>
                  <div style={{ fontSize:12, color:"#aaa" }}>{SPECIES_EMOJI[friend.species]} {friend.breed}</div>
                </div>
              </div>
              <div style={{ background:"#fff", borderRadius:20, padding:16, minHeight:350, maxHeight:420, overflowY:"auto", marginBottom:12, boxShadow:"0 3px 12px rgba(0,0,0,0.06)" }}>
                {chatMsgs.length===0&&<div style={{ textAlign:"center", padding:40, color:"#ccc" }}><div style={{ fontSize:50 }}>🐾</div><p>Merhaba demek için bir şeyler yaz!</p></div>}
                {chatMsgs.map((msg,i)=>{
                  const isMe=msg.from===me.id;
                  return (
                    <div key={i} style={{ display:"flex", justifyContent:isMe?"flex-end":"flex-start", marginBottom:10 }}>
                      {!isMe&&<div style={{ fontSize:28, marginRight:8 }}>{friend.avatar}</div>}
                      <div style={{ maxWidth:"70%", background:isMe?"linear-gradient(135deg,#FF7043,#FF8A65)":"#F5F5F5", color:isMe?"#fff":"#333", borderRadius:isMe?"18px 18px 4px 18px":"18px 18px 18px 4px", padding:"10px 14px", fontSize:14, fontWeight:600 }}>
                        {msg.text}
                        <div style={{ fontSize:10, opacity:0.7, marginTop:3, textAlign:"right" }}>{msg.time}</div>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <input value={newMsg} onChange={e=>setNewMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} style={{ flex:1, border:"2px solid #FFE0B2", borderRadius:25, padding:"12px 18px", fontFamily:"Nunito", fontSize:14, outline:"none" }} placeholder="Mesaj yaz... 🐾" />
                <button className="action-btn" onClick={sendMessage} style={{ background:"linear-gradient(135deg,#FF7043,#FF8A65)", border:"none", borderRadius:25, padding:"12px 20px", color:"#fff", cursor:"pointer", fontWeight:800, fontSize:18 }}>➤</button>
              </div>
            </div>
          );
        })()}

        {activeTab==="profile" && (
          <div style={{ animation:"slideUp 0.3s ease" }}>
            <div style={{ background:"linear-gradient(135deg,#FF7043,#FFAB40)", borderRadius:24, padding:28, marginBottom:18, textAlign:"center", color:"#fff" }}>
              <div style={{ fontSize:80, animation:"float 2.5s ease-in-out infinite" }}>{me.avatar}</div>
              <h2 style={{ fontFamily:"Fredoka One", fontSize:32, margin:"8px 0 4px" }}>{me.petName}</h2>
              <div style={{ fontSize:15, opacity:0.9, marginBottom:6 }}>{SPECIES_EMOJI[me.species]} {me.species} · {me.breed}</div>
              <div style={{ fontSize:14, opacity:0.8 }}>{me.age} yaşında · Sahibi: {me.ownerName}</div>
            </div>
            <div style={{ background:"#fff", borderRadius:20, padding:18, marginBottom:14, boxShadow:"0 3px 12px rgba(0,0,0,0.06)" }}>
              <h4 style={{ color:"#FF7043", fontFamily:"Fredoka One", margin:"0 0 8px" }}>📝 Hakkımda</h4>
              <p style={{ color:"#555", fontSize:15, margin:0 }}>{me.bio}</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:18 }}>
              {[{label:"Arkadaş",value:me.friends?.length||0,icon:"🐾"},{label:"Gönderi",value:myPosts.length,icon:"📸"},{label:"Yaş",value:me.age+" yaş",icon:"🎂"}].map(s=>(
                <div key={s.label} style={{ background:"#fff", borderRadius:18, padding:16, textAlign:"center", boxShadow:"0 3px 12px rgba(0,0,0,0.06)" }}>
                  <div style={{ fontSize:28 }}>{s.icon}</div>
                  <div style={{ fontFamily:"Fredoka One", fontSize:22, color:"#FF7043" }}>{s.value}</div>
                  <div style={{ fontSize:12, color:"#aaa", fontWeight:700 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background:"#fff", borderRadius:20, padding:18, boxShadow:"0 3px 12px rgba(0,0,0,0.06)" }}>
              <h4 style={{ color:"#FF7043", fontFamily:"Fredoka One", margin:"0 0 12px" }}>📸 Gönderilerim</h4>
              {myPosts.length===0?(
                <div style={{ textAlign:"center", padding:20, color:"#ccc" }}><div style={{ fontSize:40 }}>📸</div><p>Henüz gönderi yok</p></div>
              ):myPosts.map(post=>(
                <div key={post.id} style={{ background:"#FFF8F0", borderRadius:16, padding:14, marginBottom:10 }}>
                  <div style={{ fontSize:36, textAlign:"center", marginBottom:8 }}>{post.image}</div>
                  <p style={{ fontSize:14, color:"#555", margin:"0 0 8px" }}>{post.text}</p>
                  <div style={{ fontSize:12, color:"#aaa" }}>❤️ {post.likes} beğeni · {post.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function btn(bg, color, width) {
  return { background:bg, color, border:"none", borderRadius:20, padding:"9px 18px", fontFamily:"Nunito", fontWeight:800, fontSize:13, cursor:"pointer", width:width||"auto", transition:"all 0.2s" };
}
function authBg() {
  return { minHeight:"100vh", background:"linear-gradient(135deg,#FFF4E6 0%,#FFE0B2 50%,#FFCCBC 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:20, fontFamily:"Nunito, sans-serif" };
}
function card(maxWidth) {
  return { background:"#fff", borderRadius:28, padding:32, width:"100%", maxWidth:maxWidth||"420px", boxShadow:"0 10px 40px rgba(255,112,67,0.15)", animation:"pop 0.4s ease", display:"flex", flexDirection:"column", gap:12, position:"relative" };
}
function title() {
  return { fontFamily:"Fredoka One", fontSize:26, color:"#E65100", margin:"0 0 4px", textAlign:"center" };
}
function input() {
  return { width:"100%", border:"2px solid #FFE0B2", borderRadius:14, padding:"11px 14px", fontFamily:"Nunito", fontSize:14, outline:"none", background:"#FFFAF5", color:"#333" };
}
function label() {
  return { display:"block", fontWeight:800, fontSize:12, color:"#FF7043", marginBottom:4 };
}
function notifStyle() {
  return { position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", background:"#fff", border:"3px solid #FF7043", borderRadius:16, padding:"12px 24px", fontWeight:800, color:"#E65100", zIndex:9999, boxShadow:"0 5px 20px rgba(255,112,67,0.3)", animation:"notif 2.5s ease forwards", whiteSpace:"nowrap" };
}