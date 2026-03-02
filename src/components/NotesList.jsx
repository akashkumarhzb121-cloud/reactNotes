import Note from './Note';

export default function NotesList() {
  return (
    <div className="masonry-grid" id="notesContainer">
      
      <Note title="1️⃣ What is React & Why?">
        <p><strong>React</strong> is a JavaScript library used to build User Interfaces (UI), especially for single-page applications (SPA). Created by Facebook (Meta).</p>
        <h3>✅ Why React?</h3>
        <ul>
            <li>Component-based architecture</li>
            <li>Reusable UI parts</li>
            <li>Fast (Virtual DOM)</li>
            <li>Large community & industry standard</li>
        </ul>
        <p>🔥 <strong>Without React:</strong> Messy manual DOM updates (<code>innerHTML</code>).<br />
        🔥 <strong>With React:</strong> Automatic DOM updates via Virtual DOM.</p>
      </Note>

      <Note title="2️⃣ Installing React (Vite)">
        <p>Create React App using Vite (Fastest way):</p>
        <pre><code>npm create vite@latest
# Select: React -&gt; JavaScript -&gt; No (for beta)
cd project-name
npm install
npm run dev</code></pre>
      </Note>

      <Note title="3️⃣ Import & Export">
        <div className="flex-row">
            <div className="flex-col">
                <strong>Named Export</strong>
                <pre><code>export const name = "Akash";
// Import
import {'{'} name {'}'} from "./file";</code></pre>
            </div>
            <div className="flex-col">
                <strong>Default Export</strong>
                <pre><code>export default function App() {'{}'}
// Import
import App from "./App";</code></pre>
            </div>
        </div>
      </Note>

      <Note title="4️⃣ Folder Structure (Basic)">
        <pre><code>src/
 ├── assets/
 ├── components/
 ├── App.jsx   ← Main component
 ├── main.jsx  ← Entry point
 └── index.css</code></pre>
        <p><strong>main.jsx:</strong> Entry point. Uses <code>ReactDOM.createRoot(document.getElementById("root")).render(&lt;App /&gt;);</code></p>
      </Note>

      <Note title="5️⃣ Real DOM vs Virtual DOM">
        <div className="diagram-container">
            <div className="mermaid">
                graph LR
                State[State Changes] --&gt; VDOM1[New Virtual DOM]
                VDOM1 --&gt; Diff[Diffing with Old VDOM]
                Diff --&gt; RealDOM[Update ONLY changed parts in Real DOM]
                style State fill:#e2e8f0
                style RealDOM fill:#fca5a5
                style VDOM1 fill:#86efac
            </div>
        </div>
        <ul>
            <li>🟥 <strong>Real DOM:</strong> Directly updates browser, slow when app grows.</li>
            <li>🟩 <strong>Virtual DOM:</strong> Copy of real DOM in memory. Compares changes (<span className="highlight">diffing</span>) and updates only what changed. Makes React fast!</li>
        </ul>
      </Note>

      <Note title="6️⃣ JSX (JavaScript XML)">
        <p>Allows writing HTML inside JavaScript. <code>const el = &lt;h1&gt;Hello&lt;/h1&gt;;</code></p>
        <h3>JSX Rules:</h3>
        <ol>
            <li>Must return a single parent element (use Fragments <code>&lt;&gt;...&lt;/&gt;</code>).</li>
            <li>Use <code>className</code> instead of <code>class</code>.</li>
            <li>Use <code>{'{'}{'}'}</code> for JavaScript inside JSX. <code>&lt;h1&gt;Hello {'{'}name{'}'}&lt;/h1&gt;</code></li>
        </ol>
      </Note>

      <Note title="7️⃣ useState Hook">
        <p>Used to create and manage state (dynamic data) in functional components.</p>
        <pre><code>const [state, setState] = useState(initialValue);</code></pre>
        <p><strong>Rules:</strong> Never mutate state directly (<code>count = 1</code> ❌). Always use setter (<code>setCount(1)</code> ✅).</p>
        <p><strong>Best Practice (Update via previous):</strong><br /><code>setCount(prev =&gt; prev + 1);</code></p>
      </Note>

      <Note title="8️⃣ Adding CSS in React">
        <ul>
            <li><strong>Normal CSS:</strong> <code>import "./App.css";</code></li>
            <li><strong>Inline:</strong> <code>&lt;h1 style={'{'}{'{'} color: "blue" {'}'}{'}'}&gt;</code></li>
            <li><strong>CSS Modules:</strong> <code>import styles from "./App.module.css"; className={'{'}styles.heading{'}'}</code></li>
            <li><strong>Tailwind CSS (Popular):</strong> Utility-first. <code>className="text-red-500 font-bold"</code></li>
        </ul>
      </Note>

      <Note title="9️⃣ Calling Functions & Events">
        <p>Functions called via events. Do not execute immediately in the render!</p>
        <p>❌ <strong>Wrong:</strong> <code>onClick={'{'}sayHello(){'}'}</code></p>
        <p>✅ <strong>Correct (No args):</strong> <code>onClick={'{'}sayHello{'}'}</code></p>
        <p>✅ <strong>Correct (With args):</strong> <code>onClick={'{'}() =&gt; sayHello("Akash"){'}'}</code></p>
      </Note>

      <Note title="🔟 Form Handling & Two-Way Binding">
        <p><strong>Two-Way Binding:</strong> Data flows State → UI and UI → State. Handled via <code>value</code> and <code>onChange</code>.</p>
        <pre><code>const [name, setName] = useState("");
// Multiple Inputs Example:
const [form, setForm] = useState({'{'}email: "", pass: ""{'}'});
function handleChange(e) {'{'}
  setForm({'{'} ...form, [e.target.name]: e.target.value {'}'});
{'}'}</code></pre>
        <p><em>Use <code>e.preventDefault()</code> on submit to stop page reload!</em></p>
      </Note>

      <Note title="1️⃣2️⃣ Components">
        <p>Reusable pieces of UI. Must start with a <strong>Capital Letter</strong> and return JSX.</p>
        <pre><code>function Welcome() {'{'}
  return &lt;h1&gt;Hello Akash&lt;/h1&gt;;
{'}'}
export default Welcome;</code></pre>
      </Note>

      <Note title="1️⃣3️⃣ Props & Prop Drilling">
        <p><strong>Props:</strong> Properties passed from Parent → Child.</p>
        <pre><code>function User({'{'} name, age {'}'}) {'{'} // Destructured
  return &lt;h2&gt;{'{'}name{'}'} is {'{'}age{'}'}&lt;/h2&gt;;
{'}'}
// Usage: &lt;User name="Akash" age={'{'}20{'}'} /&gt;</code></pre>
        
        <div className="diagram-container">
            <div className="mermaid">
                graph TD
                App --&gt; Parent
                Parent --&gt;|Props Drilling (Messy)| Child
                Child --&gt; GrandChild
                App -.-&gt;|Context API (Clean)| GrandChild
            </div>
        </div>
        <p><strong>Solution to Prop Drilling:</strong> Context API or Redux.</p>
      </Note>

      <Note title="1️⃣4️⃣ Rendering JSON / Lists">
        <p>Render arrays using <code>.map()</code>.</p>
        <pre><code>{'{'}users.map((user) =&gt; (
  &lt;h3 key={'{'}user.id{'}'}&gt;{'{'}user.name{'}'}&lt;/h3&gt;
)){'}'}</code></pre>
        <p>🔥 <strong>Important:</strong> Always use a unique <code>key</code> prop! React uses it to identify elements and optimize re-rendering. <em>Never use array index as a key for dynamic lists.</em></p>
      </Note>

      <Note title="1️⃣5️⃣ Axios (API Integration)">
        <p>HTTP client for APIs. <code>npm install axios</code></p>
        <pre><code>useEffect(() =&gt; {'{'}
  axios.get("https://api.example.com/data")
    .then(res =&gt; setData(res.data))
    .catch(err =&gt; console.log(err));
{'}'}, []);</code></pre>
      </Note>

      <Note title="1️⃣6️⃣ React Router DOM">
        <p>Navigation without page refresh. <code>npm i react-router-dom</code></p>
        <pre><code>&lt;BrowserRouter&gt;
  &lt;Routes&gt;
    &lt;Route path="/" element={'{'}&lt;Home /&gt;{'}'} /&gt;
    &lt;Route path="/user/:id" element={'{'}&lt;User /&gt;{'}'} /&gt;
  &lt;/Routes&gt;
&lt;/BrowserRouter&gt;</code></pre>
        <p>Use <code>&lt;Link to="/about"&gt;</code> to navigate. Use <code>useParams()</code> for dynamic IDs.</p>
      </Note>

      <Note title="1️⃣8️⃣ useEffect Hook">
        <p>Used for side effects (API calls, timers, DOM manipulation).</p>
        <ul>
            <li><code>useEffect(() =&gt; {'{}'}, []);</code> → Runs <strong>once</strong> (on mount).</li>
            <li><code>useEffect(() =&gt; {'{}'}, [count]);</code> → Runs when <code>count</code> changes.</li>
        </ul>
        <p><strong>Cleanup Function:</strong> Runs on unmount to clear timers/listeners.</p>
        <pre><code>useEffect(() =&gt; {'{'}
  const timer = setInterval(()=&gt;..., 1000);
  return () =&gt; clearInterval(timer); // Cleanup
{'}'}, []);</code></pre>
      </Note>

      <Note title="1️⃣9️⃣ useRef Hook">
        <p>Access DOM directly or store mutable values <strong>without triggering re-renders</strong>.</p>
        <pre><code>const inputRef = useRef(null);
inputRef.current.focus(); // DOM access

const countRef = useRef(0);
countRef.current++; // No re-render caused</code></pre>
      </Note>

      <Note title="2️⃣0️⃣ Context API">
        <p>Global state to solve Prop Drilling.</p>
        <ol>
            <li><strong>Create:</strong> <code>export const UserContext = createContext();</code></li>
            <li><strong>Provide:</strong> <code>&lt;UserContext.Provider value={'{'}user{'}'}&gt;...</code></li>
            <li><strong>Consume:</strong> <code>const user = useContext(UserContext);</code></li>
        </ol>
        <p><em>Use for: Theme, Auth, Settings. Not for complex state.</em></p>
      </Note>

      <Note title="2️⃣1️⃣ Redux Toolkit">
        <p>State management for large applications. Modern approach.</p>
        <div className="diagram-container">
            <div className="mermaid">
                graph LR
                Store[Store] --&gt; Provider
                Provider --&gt; UI[Component UI]
                UI --&gt;|dispatch(action)| Slice
                Slice --&gt;|Update State| Store
            </div>
        </div>
        <p><strong>Steps:</strong> Create Slice (reducers) → Create Store → Wrap App in <code>&lt;Provider&gt;</code> → Use <code>useSelector</code> (read) and <code>useDispatch</code> (write).</p>
      </Note>

      <Note title="2️⃣2️⃣ Framer Motion & Deployment">
        <p><strong>Framer Motion:</strong> Animation library. <code>&lt;motion.div initial={'{'}{'{'}opacity:0{'}'}{'}'} animate={'{'}{'{'}opacity:1{'}'}{'}'}&gt;</code></p>
        <p><strong>Deployment:</strong> Build via <code>npm run build</code> (creates <code>dist/</code>). Host on Vercel, Netlify, or GitHub Pages.</p>
      </Note>

      {/* ADVANCED SECTION */}
      <Note title="🚀 Advanced React Architecture (Phase 4)" isAdvanced fullWidth />

      <Note title="🧠 React Rendering Cycle" isAdvanced>
        <ol>
            <li>State/Props change or Parent re-renders.</li>
            <li>Component function runs.</li>
            <li>JSX recreated → Virtual DOM updated.</li>
            <li><strong>Reconciliation:</strong> React compares old vs new VDOM.</li>
            <li>Only changed parts updated in Real DOM.</li>
        </ol>
        <p><em>Note: If a parent re-renders, ALL children re-render by default!</em></p>
      </Note>

      <Note title="⚡ Memoization Strategy" isAdvanced>
        <p>Remember previous results to prevent unnecessary recalculations/renders.</p>
        <table>
            <thead><tr><th>Tool</th><th>Purpose</th></tr></thead>
            <tbody>
                <tr><td><code>React.memo</code></td><td>Wraps a component to prevent re-render if props haven't changed.</td></tr>
                <tr><td><code>useMemo</code></td><td>Memoizes an <strong>expensive calculation</strong> / value.</td></tr>
                <tr><td><code>useCallback</code></td><td>Memoizes a <strong>function reference</strong> so children don't re-render.</td></tr>
            </tbody>
        </table>
      </Note>

      <Note title="🧩 Controlled vs Uncontrolled" isAdvanced>
        <table>
            <thead><tr><th>Controlled</th><th>Uncontrolled</th></tr></thead>
            <tbody>
                <tr><td>Uses <code>useState</code></td><td>Uses <code>useRef</code></td></tr>
                <tr><td>Re-renders on type</td><td>No re-render</td></tr>
                <tr><td>Best for Forms</td><td>Best for simple access</td></tr>
            </tbody>
        </table>
      </Note>

      <Note title="🪝 Custom Hooks" isAdvanced>
        <p>Extract reusable logic. Must start with <code>use</code>.</p>
        <pre><code>function useLocalStorage(key, initVal) {'{'}
  const [val, setVal] = useState(...);
  useEffect(() =&gt; localStorage.setItem(key, val), [val]);
  return [val, setVal];
{'}'}</code></pre>
      </Note>

      <Note title="🏗️ Architecture & Best Practices" isAdvanced>
        <p><span className="badge">State Colocation</span> Keep state as close as possible to where it is used. Don't put everything in App.jsx.</p>
        <p><span className="badge">useReducer</span> Alternative to useState for complex/multiple related state updates.</p>
        <p><span className="badge">Error Boundaries</span> Class component that catches JS errors in children to prevent the whole app from white-screening.</p>
        <p><span className="badge">Portals</span> <code>createPortal()</code> renders a component (like a Modal) outside the main DOM hierarchy to fix z-index issues.</p>
      </Note>

      <Note title="🌐 Professional API Architecture" isAdvanced>
        <p>Never call APIs directly in components. Create a Service Layer!</p>
        <pre><code>// services/taskService.js
const API = axios.create({'{'} baseURL: env.URL {'}'});
export const getTasks = () =&gt; API.get("/tasks");

// components/TaskList.jsx
useEffect(() =&gt; {'{'}
  getTasks().then(res =&gt; setTasks(res.data));
{'}'}, []);</code></pre>
        <p><strong>Loading/Error Pattern:</strong> Always maintain <code>loading</code> (show spinner), <code>error</code> (show message), and <code>data</code> state variables.</p>
      </Note>

      <Note title="🔐 Auth & Protected Routes" isAdvanced>
        <p><strong>Flow:</strong> Login → Get JWT Token → Save to LocalStorage/Cookies → Attach to API Interceptors → Protect Routes.</p>
        <pre><code>// ProtectedRoute.jsx
function ProtectedRoute({'{'} children {'}'}) {'{'}
  const token = localStorage.getItem("token");
  return token ? children : &lt;Navigate to="/login" /&gt;;
{'}'}
// Usage: &lt;Route element={'{'}&lt;ProtectedRoute&gt;&lt;Dash/&gt;...{'}'} /&gt;</code></pre>
        <p><strong>Environment Variables:</strong> Store secrets in <code>.env</code>. Access in Vite using <code>import.meta.env.VITE_API_URL</code>. Never hardcode URLs!</p>
      </Note>

    </div>
  );
}
