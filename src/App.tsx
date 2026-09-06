import {
  AlertTriangle,
  ArrowLeft,
  Baby,
  BarChart3,
  CalendarDays,
  Check,
  ClipboardList,
  HeartHandshake,
  Hospital,
  MapPinned,
  MessageCircle,
  Milk,
  RefreshCcw,
  Search,
  Settings,
  UserRound,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

type Profile = "home" | "nutriz" | "gestor" | "atendente" | "blh" | "hospital";
type Stage = "D0" | "D2" | "D4-8" | "D10-14" | "D14+" | "Pos";
type AppointmentStatus = "agendada" | "concluida" | "cancelada";
type RequestStatus = "aberto" | "em atendimento" | "encaminhado" | "resolvido";

type ChatMessage = {
  id: string;
  from: "lara" | "nutriz" | "atendente";
  text: string;
  time: string;
};

type Nutriz = {
  id: string;
  name: string;
  age: number;
  city: string;
  cpf?: string;
  whatsapp: string;
  babyName: string;
  babyAge: string;
  birthDate: string;
  hospital: string;
  birthType: string;
  babyClass: string;
  gestationalAge: string;
  language: string;
  stage: Stage;
  journeyDay: number;
  score: number;
  previousScore: number;
  status: string;
  riskReason: string;
  pausedUntil?: string;
  consentAt?: string;
  chat: ChatMessage[];
  history: string[];
  notes: { date: string; author: string; text: string }[];
};

type Appointment = {
  id: string;
  nutrizId: string;
  blhId: string;
  date: string;
  time: string;
  modality: "Domiciliar" | "Presencial";
  address?: string;
  status: AppointmentStatus;
  firstDonation?: boolean;
};

type SupportRequest = {
  id: string;
  nutrizId: string;
  createdAt: string;
  status: RequestStatus;
  summary: string;
  messages: ChatMessage[];
};

type DemoData = {
  nutrizes: Nutriz[];
  appointments: Appointment[];
  supportRequests: SupportRequest[];
  stock: { id: string; date: string; volume: number; status: string }[];
  settings: { region: string; period: string; autoInvite: boolean; quietMode: boolean };
};

const STORAGE_KEY = "lara-lactare-demo-v2";
const stages: Stage[] = ["D0", "D2", "D4-8", "D10-14", "D14+", "Pos"];
const today = "2026-05-11";

const regions = [
  { name: "Sao Paulo - SP", short: "SP", nutrizes: 287, conversions: 38, blhs: 12, density: "alta", x: 54, y: 62 },
  { name: "Rio de Janeiro", short: "RJ", nutrizes: 172, conversions: 21, blhs: 8, density: "alta", x: 61, y: 58 },
  { name: "Belo Horizonte", short: "MG", nutrizes: 94, conversions: 14, blhs: 5, density: "media", x: 56, y: 50 },
  { name: "Atibaia - SP", short: "ATI", nutrizes: 64, conversions: 9, blhs: 1, density: "alta", x: 52, y: 60 },
  { name: "Brasilia - DF", short: "DF", nutrizes: 58, conversions: 7, blhs: 4, density: "media", x: 50, y: 42 },
  { name: "Recife - PE", short: "PE", nutrizes: 47, conversions: 6, blhs: 3, density: "media", x: 69, y: 37 },
];

const weeklyData = [
  { day: "Seg", ativadas: 122, engajadas: 61, convertidas: 28 },
  { day: "Ter", ativadas: 96, engajadas: 49, convertidas: 24 },
  { day: "Qua", ativadas: 129, engajadas: 72, convertidas: 32 },
  { day: "Qui", ativadas: 112, engajadas: 55, convertidas: 27 },
  { day: "Sex", ativadas: 138, engajadas: 76, convertidas: 36 },
  { day: "Sab", ativadas: 82, engajadas: 43, convertidas: 21 },
  { day: "Dom", ativadas: 71, engajadas: 34, convertidas: 17 },
];

const blhs = [
  { id: "blh-atibaia", name: "BLH Atibaia", city: "Atibaia", hours: "8h as 17h", modalities: "Presencial e domiciliar", distance: "1,2 km" },
  { id: "blh-sp", name: "BLH Maternidade SP", city: "Sao Paulo", hours: "7h as 18h", modalities: "Presencial" },
  { id: "blh-rj", name: "BLH Rio Centro", city: "Rio de Janeiro", hours: "8h as 16h", modalities: "Presencial e domiciliar" },
];

type ChatIntent = "cansaco" | "dor" | "pega" | "sono" | "doacao" | "recusa" | "agendar" | "blh" | "humano" | "positivo" | "cancelar" | "duvida";
type ConversationAnalysis = {
  intents: ChatIntent[];
  tone: "acolher" | "risco" | "positivo" | "neutro";
  scoreDelta: number;
  status?: string;
  needsHuman?: boolean;
  historyEntry?: string;
};

const baseChat: ChatMessage[] = [
  { id: "m1", from: "lara", time: "10:32", text: "Ola, Mariana! Sou a LARA do Lactare. Vi que sua filha Nicole chegou anteontem. Como voce esta?" },
  { id: "m2", from: "nutriz", time: "10:34", text: "Oi! Estou bem cansada mas feliz." },
  { id: "m3", from: "lara", time: "10:35", text: "Imagino. As primeiras noites sao intensas. Quer que eu te mande dicas curtas de pega e sono? Sem spam." },
];

function initialData(): DemoData {
  const nutrizes: Nutriz[] = [
    {
      id: "mariana",
      name: "Mariana Silva",
      age: 32,
      city: "Atibaia - SP",
      whatsapp: "(11) 99876-5432",
      babyName: "Nicole",
      babyAge: "14 dias",
      birthDate: "2026-05-09",
      hospital: "Maternidade SP - Unidade Sul",
      birthType: "Cesarea",
      babyClass: "Termo",
      gestationalAge: "38s",
      language: "Portugues (PT-BR)",
      stage: "D14+",
      journeyDay: 12,
      score: 47,
      previousScore: 73,
      status: "Risco",
      riskReason: "Cancelou o agendamento e relatou cansaco",
      chat: [
        ...baseChat,
        { id: "m4", from: "nutriz", time: "11:40", text: "Hoje ta complicado, sem tempo. Acho melhor cancelar a coleta." },
        { id: "m5", from: "lara", time: "11:41", text: "Tudo bem, Mariana. Vou respeitar seu momento e chamar uma atendente para te acolher." },
      ],
      history: ["D2 acolhimento ok", "D5 engajou com 5 mensagens", "D10 aceitou convite", "D12 cancelou coleta"],
      notes: [],
    },
    makeNutriz("beatriz", "Beatriz Lima", 29, "Sao Paulo - SP", "Sofia", 76, "Engajada", "D10-14"),
    makeNutriz("camila", "Camila Rocha", 35, "Rio de Janeiro", "Theo", 22, "Risco", "D4-8"),
    makeNutriz("carla", "Carla Martins", 31, "Atibaia - SP", "Lia", 69, "Acompanhamento", "D10-14"),
    makeNutriz("patricia", "Patricia Reis", 26, "Atibaia - SP", "Noah", 81, "Agendada", "D14+"),
    makeNutriz("renata", "Renata Oliveira", 34, "Atibaia - SP", "Clara", 31, "Primeira doacao", "D14+"),
  ];

  return {
    nutrizes,
    appointments: [
      { id: "a1", nutrizId: "mariana", blhId: "blh-atibaia", date: today, time: "09:00", modality: "Domiciliar", address: "Rua das Flores, 120", status: "cancelada" },
      { id: "a2", nutrizId: "beatriz", blhId: "blh-atibaia", date: today, time: "10:30", modality: "Presencial", status: "agendada" },
      { id: "a3", nutrizId: "carla", blhId: "blh-atibaia", date: today, time: "11:30", modality: "Presencial", status: "agendada" },
      { id: "a4", nutrizId: "patricia", blhId: "blh-atibaia", date: today, time: "14:00", modality: "Domiciliar", address: "Av. Lucas, 45", status: "agendada" },
      { id: "a5", nutrizId: "renata", blhId: "blh-atibaia", date: today, time: "15:30", modality: "Presencial", status: "agendada", firstDonation: true },
    ],
    supportRequests: [
      {
        id: "s1",
        nutrizId: "mariana",
        createdAt: "2026-05-11 11:42",
        status: "aberto",
        summary: "Resumo simulado: Mariana demonstrou cansaco e culpa apos cancelar o agendamento. Evitar insistencia sobre doacao agora; oferecer acolhimento e opcao de coleta domiciliar quando ela quiser.",
        messages: nutrizes[0].chat,
      },
    ],
    stock: [
      { id: "e1", date: today, volume: 420, status: "Triagem concluida" },
      { id: "e2", date: "2026-05-10", volume: 310, status: "Aguardando pasteurizacao" },
    ],
    settings: { region: "Todas", period: "Esta semana", autoInvite: true, quietMode: false },
  };
}

function makeNutriz(id: string, name: string, age: number, city: string, baby: string, score: number, status: string, stage: Stage): Nutriz {
  return {
    id,
    name,
    age,
    city,
    whatsapp: "(11) 90000-0000",
    babyName: baby,
    babyAge: "12 dias",
    birthDate: "2026-05-09",
    hospital: "Hospital parceiro",
    birthType: "Normal",
    babyClass: "Termo",
    gestationalAge: "39s",
    language: "Portugues (PT-BR)",
    stage,
    journeyDay: stage === "D14+" ? 14 : 10,
    score,
    previousScore: score + 5,
    status,
    riskReason: score < 35 ? "Baixa resposta nos ultimos dias" : "Acompanhamento regular",
    chat: [
      { id: `${id}-1`, from: "lara", time: "09:10", text: `Ola, ${name.split(" ")[0]}! Como esta a rotina com ${baby}?` },
      { id: `${id}-2`, from: "nutriz", time: "09:15", text: "Estamos nos adaptando aos poucos." },
    ],
    history: ["D2 acolhimento", "D5 conteudo personalizado", "D10 convite avaliado"],
    notes: [],
  };
}

function useDemoData() {
  const [data, setData] = useState<DemoData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialData();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const reset = () => setData(initialData());
  return { data, setData, reset };
}

const fullName = (n?: Nutriz) => n?.name ?? "Nutriz";
const firstName = (n?: Nutriz) => fullName(n).split(" ")[0];

function App() {
  const { data, setData, reset } = useDemoData();
  const [profile, setProfile] = useState<Profile>("home");
  const [selectedNutrizId, setSelectedNutrizId] = useState("mariana");
  const [toast, setToast] = useState("");

  const notify = (text: string) => {
    setToast(text);
    window.setTimeout(() => setToast(""), 2600);
  };

  const selectedNutriz = data.nutrizes.find((n) => n.id === selectedNutrizId) ?? data.nutrizes[0];

  const addMessage = (nutrizId: string, message: Omit<ChatMessage, "id" | "time">) => {
    const msg: ChatMessage = { ...message, id: crypto.randomUUID(), time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) };
    setData((prev) => ({
      ...prev,
      nutrizes: prev.nutrizes.map((n) => (n.id === nutrizId ? { ...n, chat: [...n.chat, msg] } : n)),
      supportRequests: prev.supportRequests.map((r) => (r.nutrizId === nutrizId ? { ...r, messages: [...r.messages, msg] } : r)),
    }));
  };

  const createAppointment = (nutrizId: string, modality: "Domiciliar" | "Presencial", date: string, time: string, address?: string) => {
    const appt: Appointment = { id: crypto.randomUUID(), nutrizId, blhId: "blh-atibaia", date, time, modality, address, status: "agendada" };
    setData((prev) => ({
      ...prev,
      appointments: [...prev.appointments, appt],
      nutrizes: prev.nutrizes.map((n) =>
        n.id === nutrizId ? { ...n, status: "Agendada", stage: "D14+", history: [...n.history, `Coleta ${modality.toLowerCase()} agendada para ${date} as ${time}`] } : n
      ),
    }));
    notify("Coleta agendada e enviada para a agenda do BLH.");
  };

  const requestHuman = (nutrizId: string, summary?: string) => {
    const nutriz = data.nutrizes.find((n) => n.id === nutrizId)!;
    if (data.supportRequests.some((r) => r.nutrizId === nutrizId && r.status !== "resolvido")) {
      setData((prev) => ({
        ...prev,
        supportRequests: prev.supportRequests.map((r) =>
          r.nutrizId === nutrizId && r.status !== "resolvido"
            ? {
                ...r,
                status: r.status === "aberto" ? "aberto" : "em atendimento",
                summary: summary ?? r.summary,
                messages: nutriz.chat,
              }
            : r
        ),
      }));
      notify("Atendimento humano atualizado na fila Lactare.");
      return;
    }
    setData((prev) => ({
      ...prev,
      supportRequests: [
        ...prev.supportRequests,
        {
          id: crypto.randomUUID(),
          nutrizId,
          createdAt: new Date().toLocaleString("pt-BR"),
          status: "aberto",
          summary: summary ?? `Resumo simulado: ${nutriz.name} pediu atendimento humano. Preservar historico da conversa e acolher sem solicitar que repita tudo.`,
          messages: nutriz.chat,
        },
      ],
    }));
    notify("Solicitacao criada no painel Lactare.");
  };

  const shell = (children: React.ReactNode) => (
    <>
      <header className="topbar">
        <button className="brand" onClick={() => setProfile("home")} aria-label="Voltar para selecao de perfil">
          <HeartHandshake size={24} />
          <span>LARA - Lactare</span>
        </button>
        <div className="top-actions">
          <button className="ghost" onClick={() => setProfile("home")}>Trocar perfil</button>
          <button className="ghost" onClick={() => { reset(); notify("Dados iniciais restaurados."); }}>
            <RefreshCcw size={16} /> Restaurar demonstracao
          </button>
        </div>
      </header>
      {children}
      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );

  if (profile === "home") {
    return shell(<ProfilePicker setProfile={setProfile} />);
  }

  return shell(
    <>
      {profile === "nutriz" && <NutrizChat nutriz={selectedNutriz} setNutrizId={setSelectedNutrizId} addMessage={addMessage} setData={setData} createAppointment={createAppointment} requestHuman={requestHuman} />}
      {profile === "gestor" && <Manager data={data} setData={setData} setProfile={setProfile} setNutrizId={setSelectedNutrizId} />}
      {profile === "atendente" && <Attendant data={data} setData={setData} setProfile={setProfile} setNutrizId={setSelectedNutrizId} addMessage={addMessage} createAppointment={createAppointment} notify={notify} />}
      {profile === "blh" && <BlhApp data={data} setData={setData} setProfile={setProfile} setNutrizId={setSelectedNutrizId} notify={notify} />}
      {profile === "hospital" && <HospitalPortal data={data} setData={setData} setProfile={setProfile} setNutrizId={setSelectedNutrizId} notify={notify} />}
    </>
  );
}

function ProfilePicker({ setProfile }: { setProfile: (p: Profile) => void }) {
  const cards = [
    { id: "nutriz", title: "Nutriz", text: "Chat LARA, convite e agendamento.", icon: MessageCircle },
    { id: "gestor", title: "Gestor Eurofarma", text: "Indicadores, mapa e funil.", icon: BarChart3 },
    { id: "atendente", title: "Atendente Lactare", text: "Handoff humano com contexto.", icon: Users },
    { id: "blh", title: "Gestor do BLH", text: "Agenda, estoque e doadoras.", icon: Milk },
    { id: "hospital", title: "Hospital parceiro", text: "Cadastro de alta para a LARA.", icon: Hospital },
  ] as const;

  return (
    <main className="profile-page">
      <section className="hero-panel">
        <p className="eyebrow">Challenge FIAP 2026 x Eurofarma</p>
        <h1>LARA - Lactare</h1>
        <p>Ambiente demonstrativo para acompanhar nutrizes, acolher com cuidado e conectar doadoras aos bancos de leite humano.</p>
      </section>
      <section className="profile-grid" aria-label="Selecao de perfil demonstrativo">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button key={card.id} className="profile-card" onClick={() => setProfile(card.id)}>
              <Icon size={28} />
              <strong>{card.title}</strong>
              <span>{card.text}</span>
            </button>
          );
        })}
      </section>
      <p className="demo-note">Acesso demonstrativo. Integrações, IA e WhatsApp sao simulados.</p>
    </main>
  );
}

function NutrizChat({
  nutriz,
  addMessage,
  setData,
  createAppointment,
  requestHuman,
}: {
  nutriz: Nutriz;
  setNutrizId: (id: string) => void;
  addMessage: (id: string, msg: Omit<ChatMessage, "id" | "time">) => void;
  setData: React.Dispatch<React.SetStateAction<DemoData>>;
  createAppointment: (id: string, m: "Domiciliar" | "Presencial", d: string, t: string, a?: string) => void;
  requestHuman: (id: string, summary?: string) => void;
}) {
  const [input, setInput] = useState("");
  const [stage, setStage] = useState<Stage>(nutriz.stage);
  const [showSchedule, setShowSchedule] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [nutriz.chat.length, stage]);

  const send = () => {
    const userText = input.trim();
    if (!userText) return;
    addMessage(nutriz.id, { from: "nutriz", text: userText });
    if (!nutriz.pausedUntil) {
      const analysis = analyzeUserMessage(userText, stage);
      applyConversationAnalysis(setData, nutriz.id, analysis);
      window.setTimeout(() => {
        const response = generateLaraResponse(nutriz, stage, userText, analysis);
        addMessage(nutriz.id, { from: "lara", text: response });
        if (analysis.needsHuman) {
          requestHuman(nutriz.id, `Resumo simulado: ${nutriz.name} sinalizou "${userText}". A LARA respondeu com acolhimento e recomendou atendimento humano sem repetir perguntas.`);
        }
      }, 250);
    } else {
      addMessage(nutriz.id, { from: "lara", text: `Mariana, suas mensagens automaticas estao pausadas ate ${nutriz.pausedUntil}. Se precisar, posso chamar uma atendente humana agora.` });
    }
    setInput("");
  };

  const choice = (want: boolean) => {
    addMessage(nutriz.id, { from: "nutriz", text: want ? "Sim, quero" : "Agora nao" });
    addMessage(nutriz.id, {
      from: "lara",
      text: want ? "Claro. Vou mandar uma dica por vez: observe se Nicole abocanha a areola e mantenha seu ombro relaxado." : "Combinado. Vou respeitar seu tempo e volto so quando fizer sentido para voce.",
    });
  };

  return (
    <main className="phone-layout">
      <section className="phone">
        <div className="chat-head">
          <div className="avatar">L</div>
          <div><strong>LARA - Lactare</strong><span>online - demonstracao</span></div>
        </div>
        <div className="stage-strip">
          {stages.map((s) => <button key={s} className={stage === s ? "active" : ""} onClick={() => setStage(s)}>{s}</button>)}
        </div>
        <div className="chat-body">
          {nutriz.chat.map((m) => (
            <div key={m.id} className={`bubble ${m.from}`}>
              <p>{m.text}</p>
              <small>{m.time}</small>
            </div>
          ))}
          {stage === "D10-14" && (
            <div className="content-card">
              <b>Depoimento demonstrativo</b>
              <p>"Eu tambem fiquei insegura no comeco. Doar foi leve porque vieram buscar em casa." - Ana, mae da Sofia</p>
              <p className="transcript">Audio indisponivel neste ambiente. Transcricao exibida para demonstracao.</p>
            </div>
          )}
          {stage === "D14+" && (
            <div className="content-card blh-card">
              <span>BLH mais proximo</span>
              <h3>BLH Atibaia</h3>
              <p>1,2 km da sua residencia. Aberto das 8h as 17h.</p>
              <p className="positive">Coleta domiciliar disponivel</p>
            </div>
          )}
          {nutriz.pausedUntil && <div className="system">Mensagens automaticas pausadas ate {nutriz.pausedUntil}.</div>}
          <div ref={endRef} />
        </div>
        <div className="chat-actions">
          {stage === "D2" && <>
            <button className="success" onClick={() => choice(true)}>Sim, quero</button>
            <button className="navy" onClick={() => choice(false)}>Agora nao</button>
          </>}
          {stage === "D10-14" && <>
            <button className="primary" onClick={() => setStage("D14+")}>Ver BLH proximo</button>
            <button className="navy" onClick={() => requestHuman(nutriz.id)}>Falar com atendente</button>
          </>}
          {stage === "D14+" && <>
            <button className="primary" onClick={() => setShowSchedule(true)}>Agendar coleta</button>
            <button className="navy" onClick={() => setShowSchedule(true)}>Ir presencialmente</button>
            <button className="success" onClick={() => requestHuman(nutriz.id)}>Atendente humano</button>
          </>}
        </div>
        <label className="composer">
          <span className="sr-only">Digite uma mensagem</span>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && send()} placeholder="Digite..." />
          <button onClick={send}>Enviar</button>
        </label>
      </section>
      <aside className="journey-card">
        <h2>Jornada completa</h2>
        {stages.map((s) => <button key={s} className={stage === s ? "active row" : "row"} onClick={() => setStage(s)}><span>{s}</span>{journeyLabel(s)}</button>)}
      </aside>
      {showSchedule && <ScheduleModal nutriz={nutriz} onClose={() => setShowSchedule(false)} onSubmit={createAppointment} />}
    </main>
  );
}

function analyzeUserMessage(text: string, stage: Stage): ConversationAnalysis {
  const t = normalize(text);
  const intents: ChatIntent[] = [];
  const add = (intent: ChatIntent, words: string[]) => {
    if (words.some((word) => t.includes(word))) intents.push(intent);
  };
  add("cansaco", ["cansada", "cansaco", "exausta", "esgotada", "sobrecarregada", "sem tempo", "culpa"]);
  add("dor", ["dor", "machuc", "sangr", "febre", "caroco", "empedr", "ardendo"]);
  add("pega", ["pega", "mamando", "mamar", "bico", "seio", "leite fraco", "nao sai leite"]);
  add("sono", ["sono", "dorm", "acorda", "noite", "chora"]);
  add("doacao", ["doar", "doacao", "leite", "banco de leite"]);
  add("recusa", ["nao quero", "agora nao", "depois", "nao posso", "nao consigo"]);
  add("agendar", ["agendar", "marcar", "coleta", "horario", "amanha", "presencial"]);
  add("blh", ["blh", "perto", "proximo", "endereco", "atibaia"]);
  add("humano", ["atendente", "humano", "pessoa", "falar com alguem", "me liga", "whatsapp"]);
  add("positivo", ["obrigada", "bom", "melhor", "feliz", "quero", "pode mandar", "sim"]);
  add("cancelar", ["cancelar", "desmarcar", "remarcar", "reagendar"]);

  if (intents.length === 0) intents.push("duvida");

  const risk = intents.includes("dor") || t.includes("triste") || t.includes("chorando") || t.includes("desespero");
  const tired = intents.includes("cansaco") || intents.includes("cancelar");
  const positive = intents.includes("positivo") || intents.includes("agendar") || intents.includes("doacao");

  return {
    intents,
    tone: risk ? "risco" : tired ? "acolher" : positive ? "positivo" : "neutro",
    scoreDelta: risk ? -10 : tired ? -6 : positive ? 6 : 1,
    status: risk ? "Precisa de acolhimento" : intents.includes("recusa") ? "Pausa respeitada" : intents.includes("agendar") ? "Pronta para agendar" : undefined,
    needsHuman: risk || intents.includes("humano") || intents.includes("cancelar"),
    historyEntry: `${stage}: ${summarizeIntents(intents)}`,
  };
}

function generateLaraResponse(n: Nutriz, stage: Stage, userText: string, analysis: ConversationAnalysis) {
  const name = firstName(n);
  const baby = n.babyName;
  const wants = (intent: ChatIntent) => analysis.intents.includes(intent);

  if (analysis.tone === "risco") {
    return `${name}, obrigada por me contar. Pelo que voce descreveu, quero priorizar seu conforto e seguranca. Se houver febre, dor forte ou vermelhidao intensa, procure atendimento de saude. Posso chamar uma atendente Lactare para seguir com voce agora.`;
  }
  if (wants("humano")) {
    return `Combinado, ${name}. Vou encaminhar a conversa para uma atendente Lactare com o historico daqui, assim voce nao precisa repetir a historia da ${baby}.`;
  }
  if (wants("cancelar")) {
    return `Tudo bem, ${name}. Cancelar ou remarcar nao apaga o cuidado que voce ja teve. Vou registrar o contexto e posso te oferecer coleta domiciliar em outro horario ou chamar uma atendente para acolher esse momento.`;
  }
  if (wants("recusa")) {
    return `Entendido. Vou respeitar sua decisao e reduzir os convites sobre doacao agora. Se voce quiser, continuo por aqui apenas com apoio para sua rotina com ${baby}.`;
  }
  if (wants("agendar")) {
    return `Perfeito. O BLH Atibaia esta a 1,2 km, atende das 8h as 17h e tem coleta domiciliar. Toque em "Agendar coleta" para escolher data, horario e modalidade.`;
  }
  if (wants("blh")) {
    return `O BLH mais proximo da sua residencia demonstrativa e o BLH Atibaia, a 1,2 km. Ele atende das 8h as 17h e oferece coleta domiciliar.`;
  }
  if (wants("doacao") && n.score > 70 && stage === "D10-14") {
    return `${name}, pelo seu engajamento na jornada, posso te apresentar a doacao como uma possibilidade, sem pressa. Muitas maes com producao boa preferem comecar por uma conversa curta com o BLH.`;
  }
  if (wants("pega")) {
    return `Vamos por partes. Observe se ${baby} fica com a boca bem aberta, queixo encostado na mama e sugadas ritmadas. Se houver dor persistente, eu chamo apoio humano para olhar com mais cuidado.`;
  }
  if (wants("sono")) {
    return `Essas noites podem pesar bastante, ${name}. Tente alternar descanso quando ${baby} dormir e pedir ajuda em uma tarefa pequena da casa. Quer que eu separe dicas curtas para a madrugada?`;
  }
  if (wants("cansaco")) {
    return `Eu sinto muito que esteja tao pesado hoje. Nao vou insistir em doacao. Vamos focar em voce: agua por perto, uma pausa curta e uma mamada de cada vez. Posso chamar uma atendente se quiser conversar com alguem.`;
  }
  if (wants("positivo")) {
    return `Que bom ler isso, ${name}. Vou seguir no seu ritmo com orientacoes curtas para voce e ${baby}. Quando fizer sentido, tambem posso mostrar o BLH perto de casa.`;
  }

  const fallback = [
    `${name}, entendi. Para te responder melhor: isso esta acontecendo na mamada, no sono da ${baby} ou na sua rotina de descanso?`,
    `Obrigada por compartilhar, ${name}. Posso te ajudar com uma orientacao curta agora ou encaminhar para uma atendente Lactare.`,
    `Vou considerar o momento da sua jornada (${stage}) e manter tudo sem pressa. Me conte um pouco mais do que voce precisa hoje.`,
  ];
  return fallback[Math.abs(hashText(userText)) % fallback.length];
}

function applyConversationAnalysis(setData: React.Dispatch<React.SetStateAction<DemoData>>, nutrizId: string, analysis: ConversationAnalysis) {
  setData((prev) => ({
    ...prev,
    nutrizes: prev.nutrizes.map((n) => {
      if (n.id !== nutrizId) return n;
      const score = Math.max(0, Math.min(100, n.score + analysis.scoreDelta));
      return {
        ...n,
        score,
        previousScore: n.score,
        status: analysis.status ?? n.status,
        history: analysis.historyEntry ? [...n.history, analysis.historyEntry] : n.history,
      };
    }),
  }));
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function summarizeIntents(intents: ChatIntent[]) {
  const labels: Record<ChatIntent, string> = {
    cansaco: "sinalizou cansaco",
    dor: "relatou dor ou alerta fisico",
    pega: "pediu apoio de pega",
    sono: "falou sobre sono",
    doacao: "mencionou doacao",
    recusa: "recusou ou pediu pausa",
    agendar: "quer agendar",
    blh: "buscou BLH proximo",
    humano: "pediu atendimento humano",
    positivo: "respondeu positivamente",
    cancelar: "falou em cancelar ou remarcar",
    duvida: "trouxe duvida aberta",
  };
  return intents.map((i) => labels[i]).join(", ");
}

function hashText(text: string) {
  return text.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function journeyLabel(s: Stage) {
  return ({ D0: "Parto registrado", D2: "Acolhimento empatico", "D4-8": "Educacao personalizada", "D10-14": "Convite suave", "D14+": "Agendamento BLH", Pos: "Pos-doacao" } as Record<Stage, string>)[s];
}

function ScheduleModal({ nutriz, onClose, onSubmit }: { nutriz: Nutriz; onClose: () => void; onSubmit: (id: string, m: "Domiciliar" | "Presencial", d: string, t: string, a?: string) => void }) {
  const [modality, setModality] = useState<"Domiciliar" | "Presencial">("Domiciliar");
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("09:00");
  const [address, setAddress] = useState("Rua das Flores, 120 - Atibaia");
  const [confirmed, setConfirmed] = useState(false);

  const submit = () => {
    onSubmit(nutriz.id, modality, date, time, modality === "Domiciliar" ? address : undefined);
    setConfirmed(true);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <button className="close" onClick={onClose}>x</button>
        <h2>Agendar coleta</h2>
        {!confirmed ? (
          <div className="form-grid">
            <label>Modalidade<select value={modality} onChange={(e) => setModality(e.target.value as "Domiciliar" | "Presencial")}><option>Domiciliar</option><option>Presencial</option></select></label>
            <label>Data<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
            <label>Horario<input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></label>
            {modality === "Domiciliar" && <label className="wide">Endereco<input value={address} onChange={(e) => setAddress(e.target.value)} /></label>}
            <button className="primary wide" onClick={submit}>Confirmar agendamento</button>
          </div>
        ) : (
          <div className="success-box"><Check /> Coleta {modality.toLowerCase()} confirmada para {date} as {time}. <button className="ghost" onClick={onClose}>Fechar</button></div>
        )}
      </div>
    </div>
  );
}

function Manager({ data, setData, setProfile, setNutrizId }: { data: DemoData; setData: React.Dispatch<React.SetStateAction<DemoData>>; setProfile: (p: Profile) => void; setNutrizId: (id: string) => void }) {
  const [tab, setTab] = useState("Visao Geral");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Todas");
  const [stage, setStage] = useState("Todas");
  const filtered = data.nutrizes.filter((n) =>
    n.name.toLowerCase().includes(query.toLowerCase()) && (city === "Todas" || n.city.includes(city)) && (stage === "Todas" || n.stage === stage)
  );
  const totals = useMemo(() => ({
    ativadas: data.settings.region === "Todas" ? 847 : 287,
    engajadas: data.settings.region === "Todas" ? 392 : 131,
    convidadas: data.settings.region === "Todas" ? 197 : 58,
    agendadas: data.appointments.filter((a) => a.status === "agendada").length + 101,
  }), [data]);

  return (
    <Dashboard title="LARA - Lactare Dashboard" user="Julia S. - Eurofarma" menu={["Visao Geral", "Funil", "Mapa", "Nutrizes", "BLHs", "Atendimento", "Configuracoes"]} tab={tab} setTab={setTab}>
      {tab === "Visao Geral" && <>
        <div className="section-head">
          <div><h1>Visao Geral - Esta Semana</h1><p>Dados ficticios de demonstracao. Lista detalhada exibida como amostra.</p></div>
          <Filters data={data} setData={setData} />
        </div>
        <div className="kpi-grid">
          <Kpi value={totals.ativadas} label="Nutrizes ativadas" note="+18% vs semana anterior" />
          <Kpi value={totals.engajadas} label="Engajadas (3+ msgs)" note="Taxa de engajamento 46%" />
          <Kpi value={totals.convidadas} label="Convidadas a doacao" note="Score medio 73" />
          <Kpi value={totals.agendadas} label="Doadoras agendadas" note="Conversao 12,5%" />
        </div>
        <div className="two-col">
          <ChartCard />
          <RiskList data={data} open={(id) => { setNutrizId(id); setTab("Nutrizes"); }} />
        </div>
      </>}
      {tab === "Funil" && <Funnel />}
      {tab === "Mapa" && <HeatMap />}
      {tab === "Nutrizes" && <ListPanel filtered={filtered} query={query} setQuery={setQuery} city={city} setCity={setCity} stage={stage} setStage={setStage} open={(id) => setNutrizId(id)} selected={data.nutrizes.find((n) => n.id === filtered[0]?.id) ?? data.nutrizes[0]} />}
      {tab === "BLHs" && <BlhDirectory data={data} />}
      {tab === "Atendimento" && <SupportQueue data={data} setProfile={setProfile} setNutrizId={setNutrizId} />}
      {tab === "Configuracoes" && <SettingsPanel data={data} setData={setData} />}
    </Dashboard>
  );
}

function Dashboard({ title, user, menu, tab, setTab, children }: { title: string; user: string; menu: string[]; tab: string; setTab: (v: string) => void; children: React.ReactNode }) {
  return (
    <main className="dashboard">
      <aside className="side">
        <h2>{title}</h2>
        {menu.map((m) => <button key={m} className={tab === m ? "active" : ""} onClick={() => setTab(m)}>{m}</button>)}
      </aside>
      <section className="workspace">
        <div className="workspace-user">{user}</div>
        {children}
      </section>
    </main>
  );
}

function Kpi({ value, label, note }: { value: number; label: string; note: string }) {
  return <article className="kpi"><strong>{value}</strong><span>{label}</span><small>{note}</small></article>;
}

function Filters({ data, setData }: { data: DemoData; setData: React.Dispatch<React.SetStateAction<DemoData>> }) {
  const update = (key: keyof DemoData["settings"], value: string | boolean) => setData((d) => ({ ...d, settings: { ...d.settings, [key]: value } }));
  return <div className="filters"><select value={data.settings.period} onChange={(e) => update("period", e.target.value)}><option>Esta semana</option><option>Maio/26</option></select><select value={data.settings.region} onChange={(e) => update("region", e.target.value)}><option>Todas</option><option>SP</option><option>RJ</option></select></div>;
}

function ChartCard() {
  return <article className="panel"><h2>Funil semanal por etapa</h2><ResponsiveContainer width="100%" height={260}><BarChart data={weeklyData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Legend /><Bar dataKey="ativadas" fill="#d7829c" /><Bar dataKey="engajadas" fill="#356f9f" /><Bar dataKey="convertidas" fill="#5b916e" /></BarChart></ResponsiveContainer></article>;
}

function RiskList({ data, open }: { data: DemoData; open: (id: string) => void }) {
  return <article className="panel"><h2>Nutrizes em risco de abandono</h2>{data.nutrizes.filter((n) => n.score < 50).map((n) => <button className="risk-row" key={n.id} onClick={() => open(n.id)}><AlertTriangle size={18} /><span><b>{n.name}</b><small>{n.riskReason}</small></span><strong>Score {n.score}</strong></button>)}</article>;
}

function Funnel() {
  const steps = [{ name: "Ativacao", value: 847 }, { name: "Engajamento", value: 392 }, { name: "Convite", value: 197 }, { name: "Agendamento", value: 106 }];
  return <div className="panel"><h1>Funil de jornada</h1><div className="funnel">{steps.map((s, i) => <div key={s.name} style={{ width: `${100 - i * 13}%` }}><b>{s.value}</b><span>{s.name}</span><small>{i ? `${Math.round((s.value / steps[i - 1].value) * 100)}% de passagem` : "Base ativada"}</small></div>)}</div></div>;
}

function HeatMap() {
  const [selected, setSelected] = useState(regions[0]);
  return <div className="map-page"><div className="section-head"><div><h1>Mapa de Calor - Brasil</h1><p>Concentracao ficticia de nutrizes ativadas e cobertura por BLHs.</p></div><div className="filters"><select><option>Estado: SP</option><option>Todos</option></select><select><option>Mes: Maio/26</option></select><select><option>Piloto</option></select></div></div><div className="two-col wide-left"><article className="map-panel"><svg viewBox="0 0 100 78" role="img" aria-label="Mapa vetorial demonstrativo do Brasil"><path d="M46 8 L62 10 L75 22 L72 40 L82 52 L63 65 L50 72 L38 66 L27 55 L22 39 L31 23 Z" fill="#e8f2ee" stroke="#b9c9c2" />{regions.map((r) => <button key={r.name} onClick={() => setSelected(r)}><circle cx={r.x} cy={r.y} r={Math.max(4, r.nutrizes / 34)} className={r.density} /><text x={r.x} y={r.y + 1}>{r.short}</text><title>{r.name}: {r.nutrizes} nutrizes, {r.conversions} conversoes, {r.blhs} BLHs</title></button>)}</svg><div className="legend"><span className="low"></span>Baixa <span className="mid"></span>Media <span className="high"></span>Alta densidade</div><p><b>{selected.name}</b>: {selected.nutrizes} nutrizes, {selected.conversions} conversoes e {selected.blhs} BLHs.</p></article><article className="panel"><h2>Regioes em destaque</h2><table><thead><tr><th>Cidade</th><th>Nutriz.</th><th>Conv.</th><th>BLH</th></tr></thead><tbody>{regions.map((r) => <tr key={r.name} onClick={() => setSelected(r)} className={selected.name === r.name ? "selected" : ""}><td>{r.name}</td><td>{r.nutrizes}</td><td>{r.conversions}</td><td>{r.blhs}</td></tr>)}</tbody></table></article></div></div>;
}

function ListPanel(props: { filtered: Nutriz[]; query: string; setQuery: (v: string) => void; city: string; setCity: (v: string) => void; stage: string; setStage: (v: string) => void; open: (id: string) => void; selected: Nutriz }) {
  return <div className="two-col"><article className="panel"><h1>Nutrizes</h1><div className="search"><Search size={16} /><input value={props.query} onChange={(e) => props.setQuery(e.target.value)} placeholder="Pesquisar nutriz" /></div><div className="filters"><select value={props.city} onChange={(e) => props.setCity(e.target.value)}><option>Todas</option><option>Atibaia</option><option>Sao Paulo</option></select><select value={props.stage} onChange={(e) => props.setStage(e.target.value)}><option>Todas</option>{stages.map((s) => <option key={s}>{s}</option>)}</select></div>{props.filtered.map((n) => <button className="list-row" key={n.id} onClick={() => props.open(n.id)}><span><b>{n.name}</b><small>{n.city} - {n.stage}</small></span><strong>{n.score}</strong></button>)}</article><NutrizDetail nutriz={props.selected} /></div>;
}

function NutrizDetail({ nutriz }: { nutriz: Nutriz }) {
  return <article className="panel detail"><h2>{nutriz.name}</h2><div className="metric-line"><span>Score {nutriz.score}</span><span>{nutriz.status}</span><span>Dia {nutriz.journeyDay}</span></div><p>{nutriz.city}. Bebe {nutriz.babyName}, {nutriz.babyAge}. Parto {nutriz.birthType}.</p><h3>Historico</h3>{nutriz.history.map((h) => <p key={h} className="timeline-item">{h}</p>)}<h3>Ultimas mensagens</h3>{nutriz.chat.slice(-3).map((m) => <p key={m.id}><b>{m.from}:</b> {m.text}</p>)}{nutriz.notes.length > 0 && <><h3>Notas internas</h3>{nutriz.notes.map((n) => <p key={n.date} className="note">{n.date} - {n.author}: {n.text}</p>)}</>}</article>;
}

function BlhDirectory({ data }: { data: DemoData }) {
  return <div className="panel"><h1>BLHs parceiros</h1><div className="card-grid">{blhs.map((b) => <article className="mini-card" key={b.id}><h2>{b.name}</h2><p>{b.city} - {b.hours}</p><p>{b.modalities}</p><small>{data.appointments.filter((a) => a.blhId === b.id && a.status === "agendada").length} agendamentos vinculados</small></article>)}</div></div>;
}

function SupportQueue({ data, setProfile, setNutrizId }: { data: DemoData; setProfile: (p: Profile) => void; setNutrizId: (id: string) => void }) {
  return <div className="panel"><h1>Atendimento humano</h1>{data.supportRequests.map((r) => { const n = data.nutrizes.find((x) => x.id === r.nutrizId); return <button className="support-row" key={r.id} onClick={() => { setNutrizId(r.nutrizId); setProfile("atendente"); }}><MessageCircle /><span><b>{fullName(n)}</b><small>{r.createdAt} - {r.summary}</small></span><strong>{r.status}</strong></button>; })}</div>;
}

function SettingsPanel({ data, setData }: { data: DemoData; setData: React.Dispatch<React.SetStateAction<DemoData>> }) {
  return <div className="panel"><h1>Configuracoes demonstrativas</h1><label className="check"><input type="checkbox" checked={data.settings.autoInvite} onChange={(e) => setData((d) => ({ ...d, settings: { ...d.settings, autoInvite: e.target.checked } }))} /> Convite automatico quando score maior que 70</label><label className="check"><input type="checkbox" checked={data.settings.quietMode} onChange={(e) => setData((d) => ({ ...d, settings: { ...d.settings, quietMode: e.target.checked } }))} /> Modo silencioso para contatos pausados</label></div>;
}

function Attendant({ data, setData, setProfile, setNutrizId, addMessage, createAppointment, notify }: { data: DemoData; setData: React.Dispatch<React.SetStateAction<DemoData>>; setProfile: (p: Profile) => void; setNutrizId: (id: string) => void; addMessage: (id: string, msg: Omit<ChatMessage, "id" | "time">) => void; createAppointment: (id: string, m: "Domiciliar" | "Presencial", d: string, t: string, a?: string) => void; notify: (t: string) => void }) {
  const request = [...data.supportRequests].reverse().find((r) => r.status !== "resolvido") ?? data.supportRequests[0];
  const nutriz = data.nutrizes.find((n) => n.id === request?.nutrizId) ?? data.nutrizes[0];
  const [note, setNote] = useState("");
  const [showSchedule, setShowSchedule] = useState(false);
  const pause = () => {
    const until = "18/05/2026";
    setData((d) => ({ ...d, nutrizes: d.nutrizes.map((n) => n.id === nutriz.id ? { ...n, pausedUntil: until, history: [...n.history, `Mensagens pausadas ate ${until}`] } : n) }));
    notify("Pausa registrada. Respostas automaticas ficam bloqueadas no chat.");
  };
  const saveNote = () => {
    if (!note.trim()) return;
    setData((d) => ({ ...d, nutrizes: d.nutrizes.map((n) => n.id === nutriz.id ? { ...n, notes: [...n.notes, { date: new Date().toLocaleString("pt-BR"), author: "Camila L.", text: note.trim() }] } : n) }));
    setNote("");
    notify("Nota interna salva.");
  };
  return <Dashboard title="LARA - Painel Atendente" user="Camila L. - Atendente Lactare" menu={["Atendimento"]} tab="Atendimento" setTab={() => undefined}><div className="alert-line"><AlertTriangle /> Handoff recebido da LARA - {nutriz.name} precisa de atendimento humano</div><div className="attendant-grid"><article className="panel profile"><div className="big-avatar">MS</div><h2>{nutriz.name}, {nutriz.age}</h2><p>{nutriz.city}</p><dl><dt>Bebe</dt><dd>{nutriz.babyName} - {nutriz.babyAge}</dd><dt>Parto</dt><dd>{nutriz.birthType}</dd><dt>Amamentacao</dt><dd>Pega ok - producao boa</dd><dt>Idioma</dt><dd>{nutriz.language}</dd><dt>Dia da jornada</dt><dd>{nutriz.journeyDay}/30</dd><dt>Score atual</dt><dd>{nutriz.score} (era {nutriz.previousScore})</dd></dl></article><article className="panel"><h2>Resumo IA - contexto</h2><p className="muted">Resumo simulado. Score de engajamento, sem uso clinico.</p><p>{request?.summary}</p><h3>Historico de mensagens</h3>{nutriz.chat.slice(-5).map((m) => <p key={m.id}><b>{m.from}:</b> {m.text}</p>)}</article><article className="panel actions"><button className="primary" onClick={() => { setNutrizId(nutriz.id); setProfile("nutriz"); addMessage(nutriz.id, { from: "atendente", text: "Oi, Mariana. Sou a Camila do Lactare e li seu contexto. Estou aqui com voce." }); }}>Iniciar atendimento WhatsApp</button><button className="navy" onClick={() => setShowSchedule(true)}>Agendar coleta domiciliar</button><button className="warning" onClick={pause}>Pausar mensagens da LARA - 7d</button><textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Nota interna" /><button className="ghost" onClick={saveNote}>Adicionar nota interna</button><button className="ghost" onClick={() => { setData((d) => ({ ...d, supportRequests: d.supportRequests.map((r) => r.nutrizId === nutriz.id ? { ...r, status: "encaminhado" } : r), nutrizes: d.nutrizes.map((n) => n.id === nutriz.id ? { ...n, status: "Encaminhada para psicologo" } : n) })); notify("Encaminhamento simulado registrado."); }}>Transferir para psicologo</button></article></div>{showSchedule && <ScheduleModal nutriz={nutriz} onClose={() => setShowSchedule(false)} onSubmit={createAppointment} />}</Dashboard>;
}

function BlhApp({ data, setData, setProfile, setNutrizId, notify }: { data: DemoData; setData: React.Dispatch<React.SetStateAction<DemoData>>; setProfile: (p: Profile) => void; setNutrizId: (id: string) => void; notify: (t: string) => void }) {
  const [tab, setTab] = useState("Agenda");
  const [date, setDate] = useState(today);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const list = data.appointments.filter((a) => a.date === date);
  const updateAppt = (id: string, status: AppointmentStatus) => {
    if (status === "cancelada" && !window.confirm("Confirmar cancelamento deste agendamento demonstrativo?")) return;
    setData((d) => ({ ...d, appointments: d.appointments.map((a) => a.id === id ? { ...a, status } : a) }));
    notify(`Agendamento ${status}.`);
  };
  return <main className="mobile-app"><section className="mobile-head"><h1>BLH Atibaia - Hoje</h1></section><nav className="tabs">{["Agenda", "Estoque", "Doadoras"].map((t) => <button className={tab === t ? "active" : ""} key={t} onClick={() => setTab(t)}>{t}</button>)}</nav>{tab === "Agenda" && <section><label>Data<input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>{list.length === 0 && <p className="empty">Nenhuma coleta para esta data.</p>}{list.map((a) => { const n = data.nutrizes.find((x) => x.id === a.nutrizId); return <button className={`appt ${a.status}`} key={a.id} onClick={() => setSelected(a)}><b>{a.time}</b><span>{firstName(n)} {a.firstDonation ? "- 1a vez" : ""}</span><small>{a.modality} - {a.status}</small></button>; })}</section>}{tab === "Estoque" && <Stock data={data} setData={setData} notify={notify} />}{tab === "Doadoras" && <section>{data.nutrizes.map((n) => <button className="list-row" key={n.id} onClick={() => setNutrizId(n.id)}><span><b>{n.name}</b><small>{n.city} - Score {n.score}</small></span></button>)}</section>}<nav className="bottom-nav"><button>Hoje</button><button onClick={() => setDate("2026-05-01")}>Mes</button><button>Perfil</button></nav>{selected && <div className="modal-backdrop"><div className="modal"><button className="close" onClick={() => setSelected(null)}>x</button><DonorDetail appt={selected} data={data} setProfile={setProfile} setNutrizId={setNutrizId} /><div className="inline-actions"><button className="success" onClick={() => updateAppt(selected.id, "concluida")}>Concluir</button><button className="warning" onClick={() => updateAppt(selected.id, "cancelada")}>Cancelar</button><button className="primary" onClick={() => updateAppt(selected.id, "agendada")}>Reagendar</button></div></div></div>}</main>;
}

function Stock({ data, setData, notify }: { data: DemoData; setData: React.Dispatch<React.SetStateAction<DemoData>>; notify: (t: string) => void }) {
  const [volume, setVolume] = useState(250);
  return <section><div className="form-row"><input type="number" value={volume} onChange={(e) => setVolume(Number(e.target.value))} /><button className="primary" onClick={() => { setData((d) => ({ ...d, stock: [...d.stock, { id: crypto.randomUUID(), date: today, volume, status: "Entrada registrada" }] })); notify("Entrada de estoque registrada."); }}>Registrar entrada</button></div>{data.stock.map((s) => <article className="mini-card" key={s.id}><b>{s.volume} mL</b><span>{s.date}</span><small>{s.status}</small></article>)}</section>;
}

function DonorDetail({ appt, data, setProfile, setNutrizId }: { appt: Appointment; data: DemoData; setProfile: (p: Profile) => void; setNutrizId: (id: string) => void }) {
  const n = data.nutrizes.find((x) => x.id === appt.nutrizId)!;
  return <section><button className="ghost" onClick={() => { setNutrizId(n.id); setProfile("nutriz"); }}><ArrowLeft size={16} /> Abrir conversa</button><h2>{n.name}</h2><p>{n.city} - Score {n.score} - Dia {n.journeyDay} - {n.status}</p><h3>Resumo da jornada</h3>{n.history.map((h) => <p key={h} className="timeline-item">{h}</p>)}<button className="primary">Marcar coleta</button></section>;
}

function HospitalPortal({ data, setData, setProfile, setNutrizId, notify }: { data: DemoData; setData: React.Dispatch<React.SetStateAction<DemoData>>; setProfile: (p: Profile) => void; setNutrizId: (id: string) => void; notify: (t: string) => void }) {
  const [tab, setTab] = useState("Altas");
  const [form, setForm] = useState({ name: "Ana Paula Costa", cpf: "529.982.247-25", whatsapp: "(11) 97777-1234", birthDate: "2026-05-11", hospital: "Maternidade SP - Unidade Sul", birthType: "Cesarea", babyClass: "Termo", gestationalAge: "38s", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Informe o nome.";
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(form.cpf)) nextErrors.cpf = "CPF deve estar no formato 000.000.000-00.";
    if (!/^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(form.whatsapp)) nextErrors.whatsapp = "Telefone com DDD invalido.";
    if (!form.birthDate) nextErrors.birthDate = "Informe a data.";
    if (!form.consent) nextErrors.consent = "Consentimento LGPD obrigatorio.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    const id = `nutriz-${Date.now()}`;
    const newN = makeNutriz(id, form.name, 30, "Sao Paulo - SP", "Bebe", 72, "D0 iniciado", "D0");
    newN.cpf = form.cpf;
    newN.whatsapp = form.whatsapp;
    newN.birthDate = form.birthDate;
    newN.hospital = form.hospital;
    newN.birthType = form.birthType;
    newN.babyClass = form.babyClass;
    newN.gestationalAge = form.gestationalAge;
    newN.consentAt = new Date().toLocaleString("pt-BR");
    setData((d) => ({ ...d, nutrizes: [newN, ...d.nutrizes] }));
    setNutrizId(id);
    notify("Alta enviada para a LARA. Jornada D0 iniciada.");
  };
  const set = (key: keyof typeof form, value: string | boolean) => setForm((f) => ({ ...f, [key]: value }));
  return <Dashboard title="Integracao Hospital Parceiro" user="Maternidade SP" menu={["Internacoes", "Altas", "Encaminhamentos", "Relatorios"]} tab={tab} setTab={setTab}>{tab === "Altas" ? <form className="hospital-form" onSubmit={submit}><h1>Cadastrar alta para a LARA</h1><p>Integracao hospitalar simulada. Use somente dados ficticios.</p>{(["name", "cpf", "whatsapp", "birthDate", "hospital", "birthType", "babyClass", "gestationalAge"] as const).map((key) => <label key={key}>{fieldLabel(key)}<input type={key === "birthDate" ? "date" : "text"} value={String(form[key])} onChange={(e) => set(key, e.target.value)} />{errors[key] && <small className="error">{errors[key]}</small>}</label>)}<label className="check wide"><input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} /> Consentimento LGPD explicito para encaminhamento a LARA</label>{errors.consent && <small className="error">{errors.consent}</small>}<div className="inline-actions wide"><button type="button" className="ghost" onClick={() => setProfile("home")}>Cancelar</button><button className="primary" type="submit">Enviar para LARA</button><button type="button" className="navy" onClick={() => setProfile("gestor")}>Ver no gestor</button></div></form> : <div className="panel"><h1>{tab}</h1><p>Visualizacao minima navegavel para demonstracao hospitalar.</p><p>{data.nutrizes.length} nutrizes disponiveis no ecossistema LARA.</p></div>}</Dashboard>;
}

function fieldLabel(key: string) {
  return ({ name: "Nome completo da nutriz", cpf: "CPF", whatsapp: "WhatsApp com DDD", birthDate: "Data do parto", hospital: "Hospital e unidade", birthType: "Tipo de parto", babyClass: "Classificacao do bebe", gestationalAge: "Idade gestacional" } as Record<string, string>)[key];
}

export default App;
