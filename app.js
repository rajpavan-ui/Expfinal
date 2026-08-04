"use strict";
// @ts-nocheck
const { useState, useEffect } = React;
function getCurrentTime() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}
function monthKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
function formatTime(t) {
    if (!t)
        return '';
    const [h, m] = t.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}
function formatDateNice(d) {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
const Icon = ({ path, size = 16 }) => (React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, path));
const IPlus = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
        React.createElement("line", { x1: "5", y1: "12", x2: "19", y2: "12" })) }));
const ITrash = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("polyline", { points: "3 6 5 6 21 6" }),
        React.createElement("path", { d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" }),
        React.createElement("path", { d: "M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" })) }));
const IPencil = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M12 20h9" }),
        React.createElement("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" })) }));
const ICheck = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement("polyline", { points: "20 6 9 17 4 12" }) }));
const IX = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
        React.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" })) }));
const ICal = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }),
        React.createElement("line", { x1: "16", y1: "2", x2: "16", y2: "6" }),
        React.createElement("line", { x1: "8", y1: "2", x2: "8", y2: "6" }),
        React.createElement("line", { x1: "3", y1: "10", x2: "21", y2: "10" })) }));
const IDownload = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
        React.createElement("polyline", { points: "7 10 12 15 17 10" }),
        React.createElement("line", { x1: "12", y1: "15", x2: "12", y2: "3" })) }));
const IChevL = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement("polyline", { points: "15 18 9 12 15 6" }) }));
const IChevR = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement("polyline", { points: "9 18 15 12 9 6" }) }));
const IChevD = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement("polyline", { points: "6 9 12 15 18 9" }) }));
const IList = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("line", { x1: "8", y1: "6", x2: "21", y2: "6" }),
        React.createElement("line", { x1: "8", y1: "12", x2: "21", y2: "12" }),
        React.createElement("line", { x1: "8", y1: "18", x2: "21", y2: "18" }),
        React.createElement("line", { x1: "3", y1: "6", x2: "3.01", y2: "6" }),
        React.createElement("line", { x1: "3", y1: "12", x2: "3.01", y2: "12" }),
        React.createElement("line", { x1: "3", y1: "18", x2: "3.01", y2: "18" })) }));
const IHome = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
        React.createElement("polyline", { points: "9 22 9 12 15 12 15 22" })) }));
const IBarChart = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("line", { x1: "12", y1: "20", x2: "12", y2: "10" }),
        React.createElement("line", { x1: "18", y1: "20", x2: "18", y2: "4" }),
        React.createElement("line", { x1: "6", y1: "20", x2: "6", y2: "16" })) }));
const IUp = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("line", { x1: "12", y1: "19", x2: "12", y2: "5" }),
        React.createElement("polyline", { points: "5 12 12 5 19 12" })) }));
const IDown = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
        React.createElement("polyline", { points: "19 12 12 19 5 12" })) }));
const ITarget = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "9" }),
        React.createElement("circle", { cx: "12", cy: "12", r: "5" }),
        React.createElement("circle", { cx: "12", cy: "12", r: "1" })) }));
const IGear = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "3" }),
        React.createElement("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" })) }));
const IUser = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
        React.createElement("circle", { cx: "12", cy: "7", r: "4" })) }));
const ISun = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "4" }),
        React.createElement("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" })) }));
const IMoon = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement("path", { d: "M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" }) }));
const IMonitor = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2" }),
        React.createElement("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
        React.createElement("line", { x1: "12", y1: "17", x2: "12", y2: "21" })) }));
const IFileText = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
        React.createElement("path", { d: "M14 2v6h6M9 13h6M9 17h6M9 9h1" })) }));
const IWaves = (p) => React.createElement(Icon, Object.assign({}, p, { path: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M2 6c1.5-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0 3.5 1.5 5 0" }),
        React.createElement("path", { d: "M2 12c1.5-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0 3.5 1.5 5 0" }),
        React.createElement("path", { d: "M2 18c1.5-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0 3.5 1.5 5 0" })) }));
// category -> simple glyph path (kept minimal, drawn in the tile's accent color)
const CAT_ICONS = {
    Food: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M6 2v7a2 2 0 0 0 2 2v11" }),
        React.createElement("path", { d: "M6 2v20M18 2v20M18 2c-2 0-3 2-3 5s1 5 3 5" })),
    Transport: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M5 17h14M5 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM19 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 17l1.5-7h11L19 17M6.5 10l1-4h9l1 4" })),
    Shopping: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" }),
        React.createElement("path", { d: "M3 6h18M16 10a4 4 0 0 1-8 0" })),
    Bills: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
        React.createElement("path", { d: "M14 2v6h6M9 13h6M9 17h6" })),
    Health: React.createElement(React.Fragment, null,
        React.createElement("path", { d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" })),
    Fun: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "12", cy: "12", r: "10" }),
        React.createElement("path", { d: "M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" })),
    Other: React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: "5", cy: "12", r: "1.5" }),
        React.createElement("circle", { cx: "12", cy: "12", r: "1.5" }),
        React.createElement("circle", { cx: "19", cy: "12", r: "1.5" }))
};
function CategoryGlyph({ name, color, size }) {
    const path = CAT_ICONS[name];
    if (path)
        return React.createElement(Icon, { path: path, size: size });
    return React.createElement("div", { style: { width: size * 0.5, height: size * 0.5, borderRadius: '9999px', background: color } });
}
const QUICK_AMOUNTS = [100, 500, 1000, 2000];
function App() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSplash, setShowSplash] = useState(true);
    const [amount, setAmount] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('Food');
    const [paymentMode, setPaymentMode] = useState('Cash');
    const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);
    const [expenseTime, setExpenseTime] = useState(getCurrentTime());
    const [error, setError] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const [editDesc, setEditDesc] = useState('');
    const [editCategory, setEditCategory] = useState('Food');
    const [editPaymentMode, setEditPaymentMode] = useState('Cash');
    const [editTime, setEditTime] = useState('');
    const [editDate, setEditDate] = useState('');
    const [activeTab, setActiveTab] = useState('home');
    const [calendarMonth, setCalendarMonth] = useState(new Date().toISOString().slice(0, 7));
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [homeMonth, setHomeMonth] = useState(new Date().toISOString().slice(0, 7));
    const [reportsMonth, setReportsMonth] = useState(new Date().toISOString().slice(0, 7));
    const [monthPickerTarget, setMonthPickerTarget] = useState(null); // 'home' | 'calendar' | 'reports'
    const [customCategories, setCustomCategories] = useState([]);
    const [customCategoryColors, setCustomCategoryColors] = useState({});
    const [hiddenBaseCategories, setHiddenBaseCategories] = useState([]);
    const [manageCategoryEditing, setManageCategoryEditing] = useState(null);
    const [manageCategoryInput, setManageCategoryInput] = useState('');
    const [confirmDeleteCategory, setConfirmDeleteCategory] = useState(null);
    const [categoriesExpanded, setCategoriesExpanded] = useState(false);
    const [addingCategory, setAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [addingEditCategory, setAddingEditCategory] = useState(false);
    const [newEditCategoryName, setNewEditCategoryName] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [detailId, setDetailId] = useState(null);
    const [detailMode, setDetailMode] = useState('view'); // 'view' | 'edit'
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [monthlyBudget, setMonthlyBudget] = useState(0);
    const [editingBudget, setEditingBudget] = useState(false);
    const [budgetInput, setBudgetInput] = useState('');
    const [showSettings, setShowSettings] = useState(false);
    const [theme, setTheme] = useState('system'); // 'light' | 'dark' | 'system'
    const [systemPrefersDark, setSystemPrefersDark] = useState(false);
    const [profileName, setProfileName] = useState('');
    const [profileNameInput, setProfileNameInput] = useState('');
    const [editingProfile, setEditingProfile] = useState(false);
    const [pdfReportMonth, setPdfReportMonth] = useState(new Date().toISOString().slice(0, 7));
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const baseCategories = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Fun', 'Other'];
    const categories = [...baseCategories.filter(c => !hiddenBaseCategories.includes(c)), ...customCategories];
    const paymentModes = ['Cash', 'Online'];
    const baseCategoryColors = {
        Food: '#f97316', Transport: '#3b82f6', Shopping: '#ec4899',
        Bills: '#ef4444', Health: '#10b981', Fun: '#a855f7', Other: '#6b7280'
    };
    const customColorPalette = ['#0ea5e9', '#d946ef', '#84cc16', '#f59e0b', '#14b8a6', '#6366f1', '#e11d48'];
    function colorForCategory(name) {
        if (customCategoryColors[name])
            return customCategoryColors[name];
        if (baseCategoryColors[name])
            return baseCategoryColors[name];
        const idx = customCategories.indexOf(name);
        if (idx >= 0)
            return customColorPalette[idx % customColorPalette.length];
        return '#64748b';
    }
    const categoryColors = new Proxy({}, { get: (_, name) => colorForCategory(name) });
    const today = new Date().toISOString().split('T')[0];
    useEffect(() => {
        try {
            const raw = localStorage.getItem('expenses-list');
            if (raw)
                setExpenses(JSON.parse(raw));
            const rawCats = localStorage.getItem('custom-categories');
            if (rawCats)
                setCustomCategories(JSON.parse(rawCats));
            const rawCatColors = localStorage.getItem('custom-category-colors');
            if (rawCatColors)
                setCustomCategoryColors(JSON.parse(rawCatColors));
            const rawHidden = localStorage.getItem('hidden-base-categories');
            if (rawHidden)
                setHiddenBaseCategories(JSON.parse(rawHidden));
            const rawBudget = localStorage.getItem('monthly-budget');
            if (rawBudget)
                setMonthlyBudget(parseFloat(rawBudget) || 0);
            const rawTheme = localStorage.getItem('theme-pref');
            if (rawTheme)
                setTheme(rawTheme);
            const rawName = localStorage.getItem('profile-name');
            if (rawName)
                setProfileName(rawName);
        }
        catch (e) { }
        setLoading(false);
        const t = setTimeout(() => setShowSplash(false), 1300);
        return () => clearTimeout(t);
    }, []);
    useEffect(() => {
        if (!window.matchMedia)
            return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        setSystemPrefersDark(mq.matches);
        function handler(ev) { setSystemPrefersDark(ev.matches); }
        if (mq.addEventListener)
            mq.addEventListener('change', handler);
        else if (mq.addListener)
            mq.addListener(handler);
        return () => {
            if (mq.removeEventListener)
                mq.removeEventListener('change', handler);
            else if (mq.removeListener)
                mq.removeListener(handler);
        };
    }, []);
    const isDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);
    const isOcean = theme === 'ocean';
    useEffect(() => {
        document.documentElement.classList.toggle('theme-dark', isDark);
        document.documentElement.classList.toggle('theme-ocean', isOcean);
    }, [isDark, isOcean]);
    function applyTheme(next) {
        setTheme(next);
        try {
            localStorage.setItem('theme-pref', next);
        }
        catch (e) { }
    }
    function saveProfile() {
        const trimmed = profileNameInput.trim();
        setProfileName(trimmed);
        try {
            localStorage.setItem('profile-name', trimmed);
        }
        catch (e) { }
        setEditingProfile(false);
    }
    function saveExpenses(list) {
        setExpenses(list);
        try {
            localStorage.setItem('expenses-list', JSON.stringify(list));
        }
        catch (e) {
            setError('Could not save. Storage may be full.');
        }
    }
    function saveCustomCategories(list) {
        setCustomCategories(list);
        try {
            localStorage.setItem('custom-categories', JSON.stringify(list));
        }
        catch (e) { }
    }
    function saveCustomCategoryColors(map) {
        setCustomCategoryColors(map);
        try {
            localStorage.setItem('custom-category-colors', JSON.stringify(map));
        }
        catch (e) { }
    }
    function saveHiddenBaseCategories(list) {
        setHiddenBaseCategories(list);
        try {
            localStorage.setItem('hidden-base-categories', JSON.stringify(list));
        }
        catch (e) { }
    }
    function nextCustomColor() {
        const used = Object.values(customCategoryColors);
        const free = customColorPalette.find(c => !used.includes(c));
        return free || customColorPalette[customCategories.length % customColorPalette.length];
    }
    function addCustomCategory(name, applyTo) {
        const trimmed = name.trim();
        if (!trimmed)
            return;
        if (categories.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
            if (applyTo)
                applyTo(trimmed);
            return;
        }
        saveCustomCategoryColors(Object.assign(Object.assign({}, customCategoryColors), { [trimmed]: nextCustomColor() }));
        saveCustomCategories([...customCategories, trimmed]);
        if (applyTo)
            applyTo(trimmed);
    }
    function renameCategory(oldName, newNameRaw) {
        const newName = newNameRaw.trim();
        if (!newName || newName === oldName) {
            setManageCategoryEditing(null);
            return true;
        }
        if (categories.some(c => c.toLowerCase() === newName.toLowerCase() && c !== oldName)) {
            setError('A category with that name already exists');
            return false;
        }
        setError('');
        const color = colorForCategory(oldName);
        saveExpenses(expenses.map(e => e.category === oldName ? Object.assign(Object.assign({}, e), { category: newName }) : e));
        if (baseCategories.includes(oldName)) {
            saveHiddenBaseCategories([...hiddenBaseCategories, oldName]);
            saveCustomCategoryColors(Object.assign(Object.assign({}, customCategoryColors), { [newName]: color }));
            saveCustomCategories([...customCategories, newName]);
        }
        else {
            const updatedColors = Object.assign({}, customCategoryColors);
            delete updatedColors[oldName];
            updatedColors[newName] = color;
            saveCustomCategoryColors(updatedColors);
            saveCustomCategories(customCategories.map(c => c === oldName ? newName : c));
        }
        if (category === oldName)
            setCategory(newName);
        if (editCategory === oldName)
            setEditCategory(newName);
        setManageCategoryEditing(null);
        return true;
    }
    function deleteCategory(name) {
        if (categories.length <= 1) {
            setError("Can't delete your only category");
            return;
        }
        const fallback = (name !== 'Other' && categories.includes('Other')) ? 'Other' : categories.find(c => c !== name);
        saveExpenses(expenses.map(e => e.category === name ? Object.assign(Object.assign({}, e), { category: fallback }) : e));
        if (baseCategories.includes(name)) {
            saveHiddenBaseCategories([...hiddenBaseCategories, name]);
        }
        else {
            saveCustomCategories(customCategories.filter(c => c !== name));
            const updatedColors = Object.assign({}, customCategoryColors);
            delete updatedColors[name];
            saveCustomCategoryColors(updatedColors);
        }
        if (category === name)
            setCategory(fallback);
        if (editCategory === name)
            setEditCategory(fallback);
        setConfirmDeleteCategory(null);
    }
    function saveBudget() {
        const val = parseFloat(budgetInput);
        const finalVal = (!val || val < 0) ? 0 : val;
        setMonthlyBudget(finalVal);
        try {
            localStorage.setItem('monthly-budget', String(finalVal));
        }
        catch (e) { }
        setEditingBudget(false);
    }
    function addExpense() {
        const val = parseFloat(amount);
        if (!val || val <= 0) {
            setError('Enter a valid amount');
            return;
        }
        setError('');
        const entry = { id: Date.now().toString(), date: expenseDate, time: expenseTime, amount: val, desc: desc.trim() || category, category, mode: paymentMode };
        saveExpenses([entry, ...expenses]);
        setAmount('');
        setDesc('');
        setExpenseTime(getCurrentTime());
        setShowAddModal(false);
    }
    function deleteExpense(id) {
        saveExpenses(expenses.filter(e => e.id !== id));
        setConfirmDeleteId(null);
        setDetailId(null);
    }
    function openDetail(e) {
        setDetailId(e.id);
        setDetailMode('view');
        setEditAmount(String(e.amount));
        setEditDesc(e.desc);
        setEditCategory(e.category);
        setEditTime(e.time || getCurrentTime());
        setEditPaymentMode(e.mode || 'Cash');
        setEditDate(e.date);
        setError('');
    }
    function closeDetail() { setDetailId(null); setConfirmDeleteId(null); }
    function saveEdit(id) {
        const val = parseFloat(editAmount);
        if (!val || val <= 0) {
            setError('Enter a valid amount');
            return;
        }
        setError('');
        saveExpenses(expenses.map(e => e.id === id ? Object.assign(Object.assign({}, e), { amount: val, desc: editDesc.trim() || editCategory, category: editCategory, time: editTime, mode: editPaymentMode, date: editDate }) : e));
        setDetailMode('view');
    }
    const currentMonth = today.slice(0, 7);
    const monthExpenses = expenses.filter(e => e.date.startsWith(currentMonth));
    const monthTotal = monthExpenses.reduce((s, e) => s + e.amount, 0);
    const todayExpenses = expenses.filter(e => e.date === today);
    const todayTotal = todayExpenses.reduce((s, e) => s + e.amount, 0);
    const byDate = expenses.reduce((acc, e) => { (acc[e.date] = acc[e.date] || []).push(e); return acc; }, {});
    const sortedDates = Object.keys(byDate).sort((a, b) => b.localeCompare(a));
    const detailExpense = expenses.find(e => e.id === detailId) || null;
    // Home tab: navigable month
    const homeMonthExpenses = expenses.filter(e => e.date.startsWith(homeMonth));
    const homeMonthTotal = homeMonthExpenses.reduce((s, e) => s + e.amount, 0);
    const homeMonthLabel = new Date(homeMonth + '-01T00:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    function shiftHomeMonth(delta) {
        const [y, m] = homeMonth.split('-').map(Number);
        const d = new Date(y, m - 1 + delta, 1);
        setHomeMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    }
    const recentTransactions = [...expenses].sort((a, b) => (b.date + (b.time || '')).localeCompare(a.date + (a.time || ''))).slice(0, 5);
    // (per-current-month category/mode/daily breakdowns now handled by the
    // navigable reportsMonth versions below; monthTotal/monthExpenses stay
    // for the Home tab's "This Month" stat card)
    // Last 6 months trend (oldest -> newest)
    const monthsTrend = [];
    for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setDate(1);
        d.setMonth(d.getMonth() - i);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const label = d.toLocaleDateString('en-US', { month: 'short' });
        const total = expenses.filter(e => e.date.startsWith(key)).reduce((s, e) => s + e.amount, 0);
        monthsTrend.push({ key, label, total });
    }
    const maxMonthTotal = Math.max(1, ...monthsTrend.map(m => m.total));
    const prevMonthTotal = monthsTrend[monthsTrend.length - 2] ? monthsTrend[monthsTrend.length - 2].total : 0;
    // reportsMonthChangePct (below) supersedes this for the Reports tab
    // Daily spend bars for current month
    // reportsDailyBars (below) supersedes this for the Reports tab
    const budgetPct = monthlyBudget > 0 ? Math.min(100, Math.round((monthTotal / monthlyBudget) * 100)) : 0;
    const budgetRemaining = monthlyBudget - monthTotal;
    const budgetOver = monthlyBudget > 0 && monthTotal > monthlyBudget;
    // Reports tab: fully navigable to any previous month
    const reportsMonthExpenses = expenses.filter(e => e.date.startsWith(reportsMonth));
    const reportsMonthTotal = reportsMonthExpenses.reduce((s, e) => s + e.amount, 0);
    const reportsMonthLabel = new Date(reportsMonth + '-01T00:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    function shiftReportsMonth(delta) {
        const [y, m] = reportsMonth.split('-').map(Number);
        const d = new Date(y, m - 1 + delta, 1);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        if (key > currentMonth)
            return; // can't navigate into the future
        setReportsMonth(key);
    }
    const reportsIsCurrentMonth = reportsMonth === currentMonth;
    const reportsMonthByCategory = categories.map(c => ({ name: c, value: reportsMonthExpenses.filter(e => e.category === c).reduce((s, e) => s + e.amount, 0) })).filter(c => c.value > 0);
    const reportsMonthByMode = paymentModes.map(m => ({ name: m, value: reportsMonthExpenses.filter(e => e.mode === m).reduce((s, e) => s + e.amount, 0) })).filter(m => m.value > 0);
    const reportsPrevMonthDate = (() => { const [y, m] = reportsMonth.split('-').map(Number); return new Date(y, m - 2, 1); })();
    const reportsPrevMonthKey = `${reportsPrevMonthDate.getFullYear()}-${String(reportsPrevMonthDate.getMonth() + 1).padStart(2, '0')}`;
    const reportsPrevMonthTotal = expenses.filter(e => e.date.startsWith(reportsPrevMonthKey)).reduce((s, e) => s + e.amount, 0);
    const reportsMonthChangePct = reportsPrevMonthTotal > 0 ? Math.round(((reportsMonthTotal - reportsPrevMonthTotal) / reportsPrevMonthTotal) * 100) : (reportsMonthTotal > 0 ? 100 : 0);
    const reportsDaysInMonth = new Date(Number(reportsMonth.slice(0, 4)), Number(reportsMonth.slice(5, 7)), 0).getDate();
    const reportsDailyBars = [];
    for (let d = 1; d <= reportsDaysInMonth; d++) {
        const dateStr = `${reportsMonth}-${String(d).padStart(2, '0')}`;
        const total = (byDate[dateStr] || []).reduce((s, e) => s + e.amount, 0);
        reportsDailyBars.push({ day: d, total });
    }
    const reportsMaxDailyTotal = Math.max(1, ...reportsDailyBars.map(d => d.total));
    const reportsBudgetPct = monthlyBudget > 0 ? Math.min(100, Math.round((reportsMonthTotal / monthlyBudget) * 100)) : 0;
    const reportsBudgetRemaining = monthlyBudget - reportsMonthTotal;
    const reportsBudgetOver = monthlyBudget > 0 && reportsMonthTotal > monthlyBudget;
    // Data for the downloadable PDF report (Settings > Download Monthly Report)
    const pdfExpenses = expenses.filter(e => e.date.startsWith(pdfReportMonth)).sort((a, b) => a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || ''));
    const pdfTotal = pdfExpenses.reduce((s, e) => s + e.amount, 0);
    const pdfLabel = new Date(pdfReportMonth + '-01T00:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const pdfByCategory = categories.map(c => ({ name: c, value: pdfExpenses.filter(e => e.category === c).reduce((s, e) => s + e.amount, 0) })).filter(c => c.value > 0).sort((a, b) => b.value - a.value);
    const pdfByMode = paymentModes.map(m => ({ name: m, value: pdfExpenses.filter(e => e.mode === m).reduce((s, e) => s + e.amount, 0) })).filter(m => m.value > 0);
    async function downloadPdfReport() {
        if (!window.PDFLib) {
            setError('PDF library not loaded. Check your connection and try again.');
            return;
        }
        setGeneratingPdf(true);
        try {
            const { PDFDocument, StandardFonts, rgb } = window.PDFLib;
            const doc = await PDFDocument.create();
            const font = await doc.embedFont(StandardFonts.Helvetica);
            const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
            const pageW = 595.28, pageH = 841.89, margin = 50;
            let page = doc.addPage([pageW, pageH]);
            let y = pageH - margin;
            const dark = rgb(0.12, 0.16, 0.22);
            const gray = rgb(0.4, 0.45, 0.53);
            const lightGray = rgb(0.85, 0.87, 0.9);
            function newPageIfNeeded(space) {
                if (y - space < margin) {
                    page = doc.addPage([pageW, pageH]);
                    y = pageH - margin;
                }
            }
            function text(str, x, size, opts) {
                page.drawText(String(str), { x, y, size, font: (opts && opts.bold) ? fontBold : font, color: (opts && opts.color) || dark });
            }
            function hLine() {
                page.drawLine({ start: { x: margin, y }, end: { x: pageW - margin, y }, thickness: 0.75, color: lightGray });
            }
            text('Expense Report', margin, 22, { bold: true });
            y -= 26;
            text(pdfLabel, margin, 13, { color: gray });
            y -= 30;
            hLine();
            y -= 24;
            text('Total Spent', margin, 11, { color: gray });
            text(`Rs ${pdfTotal.toFixed(2)}`, pageW - margin - 120, 16, { bold: true });
            y -= 22;
            if (monthlyBudget > 0) {
                const over = pdfTotal > monthlyBudget;
                text('Monthly Budget', margin, 11, { color: gray });
                text(`Rs ${monthlyBudget.toFixed(2)}${over ? '  (over budget)' : ''}`, pageW - margin - 160, 11, { color: over ? rgb(0.86, 0.2, 0.2) : gray });
                y -= 22;
            }
            text(`Transactions: ${pdfExpenses.length}`, margin, 11, { color: gray });
            y -= 30;
            if (pdfByCategory.length > 0) {
                text('By Category', margin, 13, { bold: true });
                y -= 20;
                pdfByCategory.forEach(c => {
                    newPageIfNeeded(18);
                    text(c.name, margin, 10);
                    const pct = pdfTotal > 0 ? ((c.value / pdfTotal) * 100).toFixed(0) : '0';
                    text(`Rs ${c.value.toFixed(2)}  (${pct}%)`, pageW - margin - 140, 10, { color: gray });
                    y -= 16;
                });
                y -= 14;
            }
            newPageIfNeeded(40);
            text('Transactions', margin, 13, { bold: true });
            y -= 20;
            text('Date', margin, 9, { bold: true, color: gray });
            text('Description', margin + 70, 9, { bold: true, color: gray });
            text('Category', margin + 250, 9, { bold: true, color: gray });
            text('Mode', margin + 340, 9, { bold: true, color: gray });
            text('Amount', pageW - margin - 60, 9, { bold: true, color: gray });
            y -= 6;
            hLine();
            y -= 14;
            pdfExpenses.forEach(e => {
                newPageIfNeeded(16);
                const dateStr = new Date(e.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                text(dateStr, margin, 9);
                text((e.desc || '').slice(0, 32), margin + 70, 9);
                text(e.category, margin + 250, 9, { color: gray });
                text(e.mode || '', margin + 340, 9, { color: gray });
                text(`Rs ${e.amount.toFixed(2)}`, pageW - margin - 60, 9);
                y -= 15;
            });
            const bytes = await doc.save();
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `expense-report-${pdfReportMonth}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        catch (err) {
            setError('Could not generate PDF: ' + err.message);
        }
        setGeneratingPdf(false);
    }
    const [calYear, calMonthNum] = calendarMonth.split('-').map(Number);
    const firstOfMonth = new Date(calYear, calMonthNum - 1, 1);
    const daysInMonth = new Date(calYear, calMonthNum, 0).getDate();
    const startWeekday = firstOfMonth.getDay();
    const calendarCells = [];
    for (let i = 0; i < startWeekday; i++)
        calendarCells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${calYear}-${String(calMonthNum).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        calendarCells.push({ day: d, dateStr, total: (byDate[dateStr] || []).reduce((s, e) => s + e.amount, 0) });
    }
    const monthLabel = firstOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    function shiftCalendarMonth(delta) {
        const d = new Date(calYear, calMonthNum - 1 + delta, 1);
        setCalendarMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    }
    const selectedDayExpenses = byDate[selectedDate] || [];
    const selectedDayTotal = selectedDayExpenses.reduce((s, e) => s + e.amount, 0);
    const selectedDateLabel = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    // Month picker — lets you jump straight to a month instead of only stepping with arrows
    function pickerMonths() {
        const list = [];
        const d = new Date();
        d.setDate(1);
        for (let i = 0; i < 24; i++) {
            list.push({
                key: monthKey(d),
                label: d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            });
            d.setMonth(d.getMonth() - 1);
        }
        return list;
    }
    function openMonthPicker(target) { setMonthPickerTarget(target); }
    function closeMonthPicker() { setMonthPickerTarget(null); }
    function applyPickedMonth(key) {
        if (monthPickerTarget === 'home')
            setHomeMonth(key);
        else if (monthPickerTarget === 'calendar')
            setCalendarMonth(key);
        else if (monthPickerTarget === 'reports')
            setReportsMonth(key);
        closeMonthPicker();
    }
    function currentPickerValue() {
        if (monthPickerTarget === 'home')
            return homeMonth;
        if (monthPickerTarget === 'calendar')
            return calendarMonth;
        if (monthPickerTarget === 'reports')
            return reportsMonth;
        return null;
    }
    function exportCSV() {
        const header = 'Date,Time,Category,Mode,Description,Amount\n';
        const rows = [...expenses].sort((a, b) => a.date.localeCompare(b.date))
            .map(e => `${e.date},${e.time || ''},${e.category},${e.mode || ''},"${e.desc.replace(/"/g, '""')}",${e.amount.toFixed(2)}`).join('\n');
        const blob = new Blob([header + rows], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `expenses-${today}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    function categoryGrid(current, setCurrent, isAdding, setIsAdding, name, setName) {
        return (React.createElement("div", null,
            React.createElement("div", { className: "category-grid" },
                categories.map(c => (React.createElement("button", { key: c, onClick: () => setCurrent(c), className: `category-tile ${current === c ? 'category-tile-active' : ''}`, style: { '--tile-color': categoryColors[c] } },
                    React.createElement("span", { className: "category-tile-icon", style: { background: categoryColors[c] + '20', color: categoryColors[c] } },
                        React.createElement(CategoryGlyph, { name: c, color: categoryColors[c], size: 19 })),
                    React.createElement("span", { className: "category-tile-label" }, c)))),
                React.createElement("button", { onClick: () => setIsAdding(true), className: "category-tile category-tile-dashed" },
                    React.createElement("span", { className: "category-tile-icon category-tile-icon-plus" },
                        React.createElement(IPlus, { size: 19 })),
                    React.createElement("span", { className: "category-tile-label" }, "Add"))),
            isAdding && (React.createElement("div", { className: "flex gap-2 mt-2" },
                React.createElement("input", { type: "text", autoFocus: true, placeholder: "New category name", value: name, onChange: ev => setName(ev.target.value), onKeyDown: ev => { if (ev.key === 'Enter') {
                        addCustomCategory(name, setCurrent);
                        setName('');
                        setIsAdding(false);
                    } }, className: "flex-1 border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" }),
                React.createElement("button", { onClick: () => { addCustomCategory(name, setCurrent); setName(''); setIsAdding(false); }, className: "text-xs font-medium text-white bg-slate-800 rounded-lg px-3" }, "Add"),
                React.createElement("button", { onClick: () => { setIsAdding(false); setName(''); }, className: "text-slate-400 px-1" },
                    React.createElement(IX, { size: 16 }))))));
    }
    function renderTxnRow(e) {
        return (React.createElement("button", { key: e.id, onClick: () => openDetail(e), className: "txn-row" },
            React.createElement("span", { className: "txn-icon", style: { background: categoryColors[e.category] + '20', color: categoryColors[e.category] } },
                React.createElement(CategoryGlyph, { name: e.category, color: categoryColors[e.category], size: 18 })),
            React.createElement("span", { className: "txn-mid" },
                React.createElement("span", { className: "txn-cat" }, e.category),
                React.createElement("span", { className: "txn-meta" },
                    e.time ? formatTime(e.time) : '',
                    e.time && e.mode ? ' · ' : '',
                    e.mode || '')),
            React.createElement("span", { className: "txn-right" },
                React.createElement("span", { className: "txn-amount" },
                    "\u20B9",
                    e.amount.toFixed(2)),
                React.createElement("span", { className: "txn-desc" }, e.desc))));
    }
    if (loading)
        return React.createElement("div", { className: "app-loading" },
            React.createElement("p", { className: "text-slate-400" }, "Loading..."));
    return (React.createElement("div", { className: "app-shell" },
        showSplash && (React.createElement("div", { className: "splash-overlay", onClick: () => setShowSplash(false) },
            React.createElement("div", { className: "splash-icon" }, "\u20B9"),
            React.createElement("div", { className: "splash-welcome" },
                "Welcome",
                profileName ? `,` : ''),
            profileName && React.createElement("div", { className: "splash-name" }, profileName),
            React.createElement("div", { className: "splash-sub" }, "Let's track today's spending"))),
        React.createElement("header", { className: "app-header" },
            React.createElement("div", { className: "app-header-inner" },
                React.createElement("div", { className: "app-brand" },
                    React.createElement("div", { className: "app-brand-icon" }, profileName ? profileName.trim().charAt(0).toUpperCase() : '₹'),
                    React.createElement("div", null,
                        React.createElement("div", { className: "app-brand-title" }, profileName ? `Welcome, ${profileName}` : 'Expense Tracker'),
                        React.createElement("div", { className: "app-brand-sub" }, "Track daily spending"))),
                React.createElement("button", { onClick: () => { setShowSettings(true); setProfileNameInput(profileName); }, className: "icon-btn", "aria-label": "Settings" },
                    React.createElement(IGear, { size: 18 })))),
        React.createElement("main", { className: "app-content" },
            activeTab === 'home' && (React.createElement("div", { className: "tab-pane" },
                React.createElement("div", { className: "month-nav" },
                    React.createElement("button", { onClick: () => shiftHomeMonth(-1), className: "chev-btn" },
                        React.createElement(IChevL, { size: 20 })),
                    React.createElement("button", { onClick: () => openMonthPicker('home'), className: "month-nav-label month-nav-label-btn" }, homeMonthLabel),
                    React.createElement("button", { onClick: () => shiftHomeMonth(1), className: "chev-btn" },
                        React.createElement(IChevR, { size: 20 }))),
                React.createElement("div", { className: "hero-card" },
                    React.createElement("div", { className: "hero-label" }, "Total spent this month"),
                    React.createElement("div", { className: "hero-amount" },
                        "\u20B9",
                        homeMonthTotal.toFixed(0))),
                React.createElement("div", { className: "grid grid-cols-2 gap-3 mb-4" },
                    React.createElement("div", { className: "stat-card" },
                        React.createElement("div", { className: "stat-label" }, "Today"),
                        React.createElement("div", { className: "stat-amount" },
                            "\u20B9",
                            todayTotal.toFixed(0)),
                        React.createElement("div", { className: "stat-sub" },
                            todayExpenses.length,
                            " transaction",
                            todayExpenses.length === 1 ? '' : 's')),
                    React.createElement("div", { className: "stat-card" },
                        React.createElement("div", { className: "stat-label" }, "This Month"),
                        React.createElement("div", { className: "stat-amount" },
                            "\u20B9",
                            monthTotal.toFixed(0)),
                        React.createElement("div", { className: "stat-sub" },
                            monthExpenses.length,
                            " transaction",
                            monthExpenses.length === 1 ? '' : 's'))),
                monthlyBudget > 0 && (React.createElement("div", { className: "hero-card" },
                    React.createElement("div", { className: "flex items-center justify-between mb-1" },
                        React.createElement("div", { className: "hero-label", style: { marginBottom: 0 } }, "Monthly Budget"),
                        React.createElement("span", { className: `budget-pill ${budgetOver ? 'budget-pill-over' : ''}` },
                            budgetPct,
                            "%")),
                    React.createElement("div", { className: "progress-track" },
                        React.createElement("div", { className: `progress-fill ${budgetOver ? 'progress-fill-over' : ''}`, style: { width: `${budgetPct}%` } })),
                    React.createElement("div", { className: "flex items-center justify-between mt-2 text-xs" },
                        React.createElement("span", { className: "text-slate-500" },
                            "\u20B9",
                            monthTotal.toFixed(0),
                            " of \u20B9",
                            monthlyBudget.toFixed(0)),
                        React.createElement("span", { className: budgetOver ? 'text-red-500 font-medium' : 'text-slate-500' }, budgetOver ? `₹${Math.abs(budgetRemaining).toFixed(0)} over` : `₹${budgetRemaining.toFixed(0)} left`)))),
                React.createElement("div", { className: "section-title" }, "Recent Transactions"),
                React.createElement("div", { className: "card-list" }, recentTransactions.length === 0 ? (React.createElement("div", { className: "empty-state" }, "No expenses yet. Tap the + button to add your first one.")) : recentTransactions.map(e => renderTxnRow(e))))),
            activeTab === 'list' && (React.createElement("div", { className: "tab-pane space-y-4" },
                sortedDates.length === 0 && React.createElement("p", { className: "empty-state" }, "No expenses yet. Tap the + button to add one."),
                sortedDates.map(date => {
                    const dayExpenses = byDate[date];
                    const dayTotal = dayExpenses.reduce((s, e) => s + e.amount, 0);
                    const label = date === today ? 'Today' : new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                    return (React.createElement("div", { key: date },
                        React.createElement("div", { className: "flex justify-between items-center mb-1 px-1" },
                            React.createElement("span", { className: "text-xs font-semibold text-slate-500" }, label),
                            React.createElement("span", { className: "text-xs font-semibold text-slate-500" },
                                "\u20B9",
                                dayTotal.toFixed(2))),
                        React.createElement("div", { className: "card-list" }, dayExpenses.map(e => renderTxnRow(e)))));
                }))),
            activeTab === 'calendar' && (React.createElement("div", { className: "tab-pane" },
                React.createElement("div", { className: "hero-card calendar-card" },
                    React.createElement("div", { className: "flex items-center justify-between mb-3" },
                        React.createElement("button", { onClick: () => shiftCalendarMonth(-1), className: "chev-btn" },
                            React.createElement(IChevL, { size: 20 })),
                        React.createElement("button", { onClick: () => openMonthPicker('calendar'), className: "month-nav-label month-nav-label-btn" }, monthLabel),
                        React.createElement("button", { onClick: () => shiftCalendarMonth(1), className: "chev-btn" },
                            React.createElement(IChevR, { size: 20 }))),
                    React.createElement("div", { className: "grid grid-cols-7 gap-1 mb-1" }, ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => React.createElement("div", { key: i, className: "text-center text-[10px] font-medium text-slate-400" }, d))),
                    React.createElement("div", { className: "grid grid-cols-7 gap-1" }, calendarCells.map((cell, i) => {
                        if (!cell)
                            return React.createElement("div", { key: i });
                        const isSelected = cell.dateStr === selectedDate;
                        const isToday = cell.dateStr === today;
                        return (React.createElement("button", { key: i, onClick: () => setSelectedDate(cell.dateStr), className: `flex flex-col items-center justify-center rounded-lg py-1.5 transition ${isSelected ? 'bg-slate-800 text-white' : isToday ? 'bg-slate-100 text-slate-800' : 'text-slate-600'}` },
                            React.createElement("span", { className: "text-xs font-medium" }, cell.day),
                            cell.total > 0 && React.createElement("span", { className: `w-1 h-1 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-orange-400'}` })));
                    }))),
                React.createElement("div", { className: "flex justify-between items-center mb-1 px-1" },
                    React.createElement("span", { className: "text-xs font-semibold text-slate-500" }, selectedDateLabel),
                    React.createElement("span", { className: "text-xs font-semibold text-slate-500" },
                        "\u20B9",
                        selectedDayTotal.toFixed(2))),
                React.createElement("div", { className: "card-list" }, selectedDayExpenses.length === 0 ? React.createElement("div", { className: "empty-state" }, "No expenses on this day.") : selectedDayExpenses.map(e => renderTxnRow(e))))),
            activeTab === 'reports' && (React.createElement("div", { className: "tab-pane" },
                React.createElement("div", { className: "month-nav" },
                    React.createElement("button", { onClick: () => shiftReportsMonth(-1), className: "chev-btn" },
                        React.createElement(IChevL, { size: 20 })),
                    React.createElement("button", { onClick: () => openMonthPicker('reports'), className: "month-nav-label month-nav-label-btn" }, reportsMonthLabel),
                    React.createElement("button", { onClick: () => shiftReportsMonth(1), className: "chev-btn", style: { opacity: reportsIsCurrentMonth ? 0.3 : 1 }, disabled: reportsIsCurrentMonth },
                        React.createElement(IChevR, { size: 20 }))),
                React.createElement("div", { className: "hero-card" },
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("div", null,
                            React.createElement("div", { className: "hero-label" },
                                "Total spent",
                                reportsIsCurrentMonth ? ' this month' : ''),
                            React.createElement("div", { className: "hero-amount" },
                                "\u20B9",
                                reportsMonthTotal.toFixed(0))),
                        React.createElement("div", { className: `trend-badge ${reportsMonthChangePct > 0 ? 'trend-badge-up' : reportsMonthChangePct < 0 ? 'trend-badge-down' : ''}` },
                            reportsMonthChangePct > 0 ? React.createElement(IUp, { size: 13 }) : reportsMonthChangePct < 0 ? React.createElement(IDown, { size: 13 }) : null,
                            reportsMonthChangePct === 0 ? 'No change' : `${Math.abs(reportsMonthChangePct)}% vs prev. month`))),
                React.createElement("div", { className: "hero-card" },
                    React.createElement("div", { className: "flex items-center justify-between mb-2" },
                        React.createElement("div", { className: "section-title", style: { margin: 0 } },
                            React.createElement(ITarget, { size: 13 }),
                            " Monthly Budget"),
                        React.createElement("button", { className: "link-btn", onClick: () => { setBudgetInput(monthlyBudget ? String(monthlyBudget) : ''); setEditingBudget(true); } }, monthlyBudget > 0 ? 'Edit' : 'Set budget')),
                    editingBudget ? (React.createElement("div", { className: "flex gap-2" },
                        React.createElement("input", { type: "number", inputMode: "decimal", autoFocus: true, placeholder: "e.g. 15000", value: budgetInput, onChange: e => setBudgetInput(e.target.value), onKeyDown: e => { if (e.key === 'Enter')
                                saveBudget(); }, className: "flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" }),
                        React.createElement("button", { onClick: saveBudget, className: "text-xs font-medium text-white bg-slate-800 rounded-lg px-3" }, "Save"),
                        React.createElement("button", { onClick: () => setEditingBudget(false), className: "text-slate-400 px-1" },
                            React.createElement(IX, { size: 16 })))) : monthlyBudget > 0 ? (React.createElement("div", null,
                        React.createElement("div", { className: "progress-track" },
                            React.createElement("div", { className: `progress-fill ${reportsBudgetOver ? 'progress-fill-over' : ''}`, style: { width: `${reportsBudgetPct}%` } })),
                        React.createElement("div", { className: "flex items-center justify-between mt-2 text-xs" },
                            React.createElement("span", { className: "text-slate-500" },
                                "\u20B9",
                                reportsMonthTotal.toFixed(0),
                                " of \u20B9",
                                monthlyBudget.toFixed(0),
                                " (",
                                reportsBudgetPct,
                                "%)"),
                            React.createElement("span", { className: reportsBudgetOver ? 'text-red-500 font-medium' : 'text-slate-500' }, reportsBudgetOver ? `₹${Math.abs(reportsBudgetRemaining).toFixed(0)} over` : `₹${reportsBudgetRemaining.toFixed(0)} left`)))) : (React.createElement("div", { className: "empty-state", style: { padding: '0.5rem 0' } }, "No budget set yet."))),
                React.createElement("div", { className: "section-title" },
                    "Daily Spending \u2014 ",
                    reportsMonthLabel),
                React.createElement("div", { className: "hero-card" },
                    React.createElement("div", { className: "bar-chart" }, reportsDailyBars.map(d => (React.createElement("div", { key: d.day, className: "bar-chart-col", title: `Day ${d.day}: ₹${d.total.toFixed(0)}` },
                        React.createElement("div", { className: "bar-chart-bar", style: { height: `${(d.total / reportsMaxDailyTotal) * 100}%`, opacity: d.total > 0 ? 1 : 0.15 } }))))),
                    React.createElement("div", { className: "flex justify-between text-[10px] text-slate-400 mt-1" },
                        React.createElement("span", null, "1"),
                        React.createElement("span", null, reportsDaysInMonth))),
                React.createElement("div", { className: "section-title" },
                    "Last 6 Months ",
                    React.createElement("span", { style: { fontWeight: 400, color: '#94a3b8' } }, "\u00B7 tap a bar to view that month")),
                React.createElement("div", { className: "hero-card" },
                    React.createElement("div", { className: "bar-chart bar-chart-months" }, monthsTrend.map(m => (React.createElement("button", { key: m.key, onClick: () => setReportsMonth(m.key), className: "bar-chart-col bar-chart-col-btn", title: `${m.label}: ₹${m.total.toFixed(0)}` },
                        React.createElement("div", { className: `bar-chart-bar ${m.key === reportsMonth ? 'bar-chart-bar-current' : ''}`, style: { height: `${(m.total / maxMonthTotal) * 100}%`, opacity: m.total > 0 ? 1 : 0.15 } }),
                        React.createElement("span", { className: "bar-chart-label" }, m.label)))))),
                React.createElement("div", { className: "section-title" }, "By Category"),
                React.createElement("div", { className: "hero-card" }, reportsMonthByCategory.length === 0 ? React.createElement("div", { className: "empty-state" }, "No data for this month.") : (React.createElement("div", { className: "space-y-2" }, reportsMonthByCategory.sort((a, b) => b.value - a.value).map(c => (React.createElement("div", { key: c.name },
                    React.createElement("div", { className: "flex items-center justify-between text-xs mb-0.5" },
                        React.createElement("span", { className: "text-slate-600" }, c.name),
                        React.createElement("span", { className: "font-medium text-slate-700" },
                            "\u20B9",
                            c.value.toFixed(0),
                            " \u00B7 ",
                            ((c.value / reportsMonthTotal) * 100).toFixed(0),
                            "%")),
                    React.createElement("div", { className: "w-full bg-slate-100 rounded-full h-1.5" },
                        React.createElement("div", { className: "h-1.5 rounded-full", style: { width: `${(c.value / reportsMonthTotal) * 100}%`, backgroundColor: categoryColors[c.name] } })))))))),
                React.createElement("div", { className: "section-title" }, "By Payment Mode"),
                React.createElement("div", { className: "hero-card" }, reportsMonthByMode.length === 0 ? React.createElement("div", { className: "empty-state" }, "No data for this month.") : (React.createElement("div", { className: "space-y-2" }, reportsMonthByMode.map(m => (React.createElement("div", { key: m.name },
                    React.createElement("div", { className: "flex items-center justify-between text-xs mb-0.5" },
                        React.createElement("span", { className: "text-slate-600" }, m.name),
                        React.createElement("span", { className: "font-medium text-slate-700" },
                            "\u20B9",
                            m.value.toFixed(0),
                            " \u00B7 ",
                            ((m.value / reportsMonthTotal) * 100).toFixed(0),
                            "%")),
                    React.createElement("div", { className: "w-full bg-slate-100 rounded-full h-1.5" },
                        React.createElement("div", { className: "h-1.5 rounded-full", style: { width: `${(m.value / reportsMonthTotal) * 100}%`, backgroundColor: m.name === 'Cash' ? '#10b981' : '#3b82f6' } }))))))))))),
        React.createElement("button", { className: "fab", onClick: () => setShowAddModal(true), "aria-label": "Add expense" },
            React.createElement(IPlus, { size: 26 })),
        React.createElement("nav", { className: "tab-bar" },
            React.createElement("button", { onClick: () => setActiveTab('home'), className: `tab-item ${activeTab === 'home' ? 'tab-item-active' : ''}` },
                React.createElement(IHome, { size: 20 }),
                React.createElement("span", null, "Home")),
            React.createElement("button", { onClick: () => setActiveTab('list'), className: `tab-item ${activeTab === 'list' ? 'tab-item-active' : ''}` },
                React.createElement(IList, { size: 20 }),
                React.createElement("span", null, "List")),
            React.createElement("button", { onClick: () => setActiveTab('calendar'), className: `tab-item ${activeTab === 'calendar' ? 'tab-item-active' : ''}` },
                React.createElement(ICal, { size: 20 }),
                React.createElement("span", null, "Calendar")),
            React.createElement("button", { onClick: () => setActiveTab('reports'), className: `tab-item ${activeTab === 'reports' ? 'tab-item-active' : ''}` },
                React.createElement(IBarChart, { size: 20 }),
                React.createElement("span", null, "Reports"))),
        showAddModal && (React.createElement("div", { className: "modal-overlay", onClick: () => setShowAddModal(false) },
            React.createElement("div", { className: "modal-sheet", onClick: ev => ev.stopPropagation() },
                React.createElement("div", { className: "modal-handle" }),
                React.createElement("div", { className: "modal-header" },
                    React.createElement("span", { className: "modal-title" }, "Add Expense"),
                    React.createElement("button", { onClick: () => setShowAddModal(false), className: "icon-btn" },
                        React.createElement(IX, { size: 18 }))),
                React.createElement("div", { className: "modal-body" },
                    React.createElement("div", { className: "field-label" }, "Amount"),
                    React.createElement("div", { className: "amount-input-wrap" },
                        React.createElement("span", { className: "amount-currency" }, "\u20B9"),
                        React.createElement("input", { type: "number", inputMode: "decimal", placeholder: "0", autoFocus: true, value: amount, onChange: e => setAmount(e.target.value), className: "amount-input" })),
                    React.createElement("div", { className: "quick-amounts" }, QUICK_AMOUNTS.map(q => (React.createElement("button", { key: q, onClick: () => setAmount(String(q)), className: "quick-amount-chip" },
                        "\u20B9",
                        q)))),
                    React.createElement("div", { className: "field-label" }, "Category"),
                    categoryGrid(category, setCategory, addingCategory, setAddingCategory, newCategoryName, setNewCategoryName),
                    React.createElement("div", { className: "field-label" }, "Description (optional)"),
                    React.createElement("input", { type: "text", placeholder: "What was this for?", value: desc, onChange: e => setDesc(e.target.value), className: "w-full border border-slate-200 rounded-lg px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" }),
                    React.createElement("div", { className: "field-label" }, "Date & Time"),
                    React.createElement("div", { className: "flex gap-2 mb-3" },
                        React.createElement("input", { type: "date", value: expenseDate, max: today, onChange: e => setExpenseDate(e.target.value), className: "flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-300" }),
                        React.createElement("input", { type: "time", value: expenseTime, onChange: e => setExpenseTime(e.target.value), className: "border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-300" })),
                    React.createElement("div", { className: "field-label" }, "Payment Mode"),
                    React.createElement("div", { className: "flex gap-2 mb-4" }, paymentModes.map(m => (React.createElement("button", { key: m, onClick: () => setPaymentMode(m), className: `flex-1 rounded-lg py-1.5 text-sm font-medium border transition ${paymentMode === m ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200'}` }, m)))),
                    error && React.createElement("p", { className: "text-red-500 text-xs mb-2" }, error),
                    React.createElement("button", { onClick: addExpense, className: "w-full bg-slate-800 text-white rounded-lg py-3 font-medium flex items-center justify-center gap-1" },
                        React.createElement(ICheck, { size: 18 }),
                        " Add Expense"))))),
        detailExpense && (React.createElement("div", { className: "modal-overlay", onClick: closeDetail },
            React.createElement("div", { className: "modal-sheet", onClick: ev => ev.stopPropagation() },
                React.createElement("div", { className: "modal-handle" }),
                React.createElement("div", { className: "modal-header" },
                    React.createElement("span", { className: "modal-title" }, detailMode === 'edit' ? 'Edit Expense' : 'Transaction'),
                    React.createElement("button", { onClick: closeDetail, className: "icon-btn" },
                        React.createElement(IX, { size: 18 }))),
                React.createElement("div", { className: "modal-body" }, detailMode === 'view' ? (React.createElement("div", null,
                    React.createElement("div", { className: "detail-amount-row" },
                        React.createElement("span", { className: "txn-icon txn-icon-lg", style: { background: categoryColors[detailExpense.category] + '20', color: categoryColors[detailExpense.category] } },
                            React.createElement(CategoryGlyph, { name: detailExpense.category, color: categoryColors[detailExpense.category], size: 22 })),
                        React.createElement("div", null,
                            React.createElement("div", { className: "detail-amount" },
                                "\u20B9",
                                detailExpense.amount.toFixed(2)),
                            React.createElement("div", { className: "detail-desc" }, detailExpense.desc))),
                    React.createElement("div", { className: "detail-rows" },
                        React.createElement("div", { className: "detail-row" },
                            React.createElement("span", null, "Category"),
                            React.createElement("span", null, detailExpense.category)),
                        React.createElement("div", { className: "detail-row" },
                            React.createElement("span", null, "Date"),
                            React.createElement("span", null, formatDateNice(detailExpense.date))),
                        detailExpense.time && React.createElement("div", { className: "detail-row" },
                            React.createElement("span", null, "Time"),
                            React.createElement("span", null, formatTime(detailExpense.time))),
                        detailExpense.mode && React.createElement("div", { className: "detail-row" },
                            React.createElement("span", null, "Payment Mode"),
                            React.createElement("span", null, detailExpense.mode))),
                    confirmDeleteId === detailExpense.id ? (React.createElement("div", { className: "confirm-delete-box" },
                        React.createElement("p", null, "Delete this expense? This can't be undone."),
                        React.createElement("div", { className: "flex gap-2" },
                            React.createElement("button", { onClick: () => setConfirmDeleteId(null), className: "flex-1 rounded-lg py-2 text-sm font-medium border border-slate-200 text-slate-600" }, "Cancel"),
                            React.createElement("button", { onClick: () => deleteExpense(detailExpense.id), className: "flex-1 rounded-lg py-2 text-sm font-medium bg-red-500 text-white" }, "Delete")))) : (React.createElement("div", { className: "flex gap-2 mt-2" },
                        React.createElement("button", { onClick: () => setDetailMode('edit'), className: "flex-1 flex items-center justify-center gap-1 rounded-lg py-2.5 text-sm font-medium bg-slate-800 text-white" },
                            React.createElement(IPencil, { size: 15 }),
                            " Edit"),
                        React.createElement("button", { onClick: () => setConfirmDeleteId(detailExpense.id), className: "flex-1 flex items-center justify-center gap-1 rounded-lg py-2.5 text-sm font-medium border border-red-200 text-red-500" },
                            React.createElement(ITrash, { size: 15 }),
                            " Delete"))))) : (React.createElement("div", null,
                    React.createElement("div", { className: "field-label" }, "Amount"),
                    React.createElement("div", { className: "amount-input-wrap" },
                        React.createElement("span", { className: "amount-currency" }, "\u20B9"),
                        React.createElement("input", { type: "number", inputMode: "decimal", value: editAmount, onChange: ev => setEditAmount(ev.target.value), className: "amount-input" })),
                    React.createElement("div", { className: "field-label" }, "Category"),
                    categoryGrid(editCategory, setEditCategory, addingEditCategory, setAddingEditCategory, newEditCategoryName, setNewEditCategoryName),
                    React.createElement("div", { className: "field-label" }, "Description"),
                    React.createElement("input", { type: "text", value: editDesc, onChange: ev => setEditDesc(ev.target.value), className: "w-full border border-slate-200 rounded-lg px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" }),
                    React.createElement("div", { className: "field-label" }, "Date & Time"),
                    React.createElement("div", { className: "flex gap-2 mb-3" },
                        React.createElement("input", { type: "date", value: editDate, max: today, onChange: ev => setEditDate(ev.target.value), className: "flex-1 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-300" }),
                        React.createElement("input", { type: "time", value: editTime, onChange: ev => setEditTime(ev.target.value), className: "border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-300" })),
                    React.createElement("div", { className: "field-label" }, "Payment Mode"),
                    React.createElement("div", { className: "flex gap-2 mb-4" }, paymentModes.map(m => (React.createElement("button", { key: m, onClick: () => setEditPaymentMode(m), className: `flex-1 rounded-lg py-1.5 text-sm font-medium border transition ${editPaymentMode === m ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200'}` }, m)))),
                    error && React.createElement("p", { className: "text-red-500 text-xs mb-2" }, error),
                    React.createElement("div", { className: "flex gap-2" },
                        React.createElement("button", { onClick: () => setDetailMode('view'), className: "flex-1 rounded-lg py-2.5 text-sm font-medium border border-slate-200 text-slate-600" }, "Cancel"),
                        React.createElement("button", { onClick: () => saveEdit(detailExpense.id), className: "flex-1 flex items-center justify-center gap-1 rounded-lg py-2.5 text-sm font-medium bg-slate-800 text-white" },
                            React.createElement(ICheck, { size: 15 }),
                            " Save")))))))),
        monthPickerTarget && (React.createElement("div", { className: "modal-overlay", onClick: closeMonthPicker },
            React.createElement("div", { className: "modal-sheet", onClick: ev => ev.stopPropagation() },
                React.createElement("div", { className: "modal-handle" }),
                React.createElement("div", { className: "modal-header" },
                    React.createElement("span", { className: "modal-title" }, "Select Month"),
                    React.createElement("button", { onClick: closeMonthPicker, className: "icon-btn" },
                        React.createElement(IX, { size: 18 }))),
                React.createElement("div", { className: "month-picker-list" }, pickerMonths().map(m => (React.createElement("button", { key: m.key, onClick: () => applyPickedMonth(m.key), className: `month-picker-item ${m.key === currentPickerValue() ? 'month-picker-item-active' : ''}` },
                    m.label,
                    m.key === currentMonth && React.createElement("span", { className: "month-picker-tag" }, "Current")))))))),
        showSettings && (React.createElement("div", { className: "modal-overlay no-print", onClick: () => { setShowSettings(false); setEditingProfile(false); } },
            React.createElement("div", { className: "modal-sheet", onClick: ev => ev.stopPropagation() },
                React.createElement("div", { className: "modal-handle" }),
                React.createElement("div", { className: "modal-header" },
                    React.createElement("span", { className: "modal-title" }, "Settings"),
                    React.createElement("button", { onClick: () => { setShowSettings(false); setEditingProfile(false); }, className: "icon-btn" },
                        React.createElement(IX, { size: 18 }))),
                React.createElement("div", { className: "modal-body" },
                    React.createElement("div", { className: "settings-section-label" }, "Profile"),
                    React.createElement("div", { className: "settings-card" }, !editingProfile ? (React.createElement("div", { className: "settings-row" },
                        React.createElement("div", { className: "flex items-center gap-2" },
                            React.createElement("span", { className: "txn-icon", style: { background: '#1e293b22', color: '#1e293b' } },
                                React.createElement(IUser, { size: 15 })),
                            React.createElement("span", { className: "text-sm text-slate-700" }, profileName || 'Add your name')),
                        React.createElement("button", { onClick: () => { setProfileNameInput(profileName); setEditingProfile(true); }, className: "link-btn" }, "Edit"))) : (React.createElement("div", { style: { padding: '0.85rem' } },
                        React.createElement("input", { type: "text", autoFocus: true, placeholder: "Your name", value: profileNameInput, onChange: e => setProfileNameInput(e.target.value), className: "w-full border border-slate-200 rounded-lg px-3 py-2 mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" }),
                        React.createElement("div", { className: "flex gap-2" },
                            React.createElement("button", { onClick: () => setEditingProfile(false), className: "flex-1 rounded-lg py-2 text-sm font-medium border border-slate-200 text-slate-600" }, "Cancel"),
                            React.createElement("button", { onClick: saveProfile, className: "flex-1 rounded-lg py-2 text-sm font-medium bg-slate-800 text-white" }, "Save"))))),
                    React.createElement("div", { className: "settings-section-label" }, "Appearance"),
                    React.createElement("div", { className: "theme-toggle" },
                        React.createElement("button", { onClick: () => applyTheme('light'), className: `theme-toggle-btn ${theme === 'light' ? 'theme-toggle-btn-active' : ''}` },
                            React.createElement(ISun, { size: 16 }),
                            React.createElement("span", null, "Light")),
                        React.createElement("button", { onClick: () => applyTheme('dark'), className: `theme-toggle-btn ${theme === 'dark' ? 'theme-toggle-btn-active' : ''}` },
                            React.createElement(IMoon, { size: 16 }),
                            React.createElement("span", null, "Dark")),
                        React.createElement("button", { onClick: () => applyTheme('system'), className: `theme-toggle-btn ${theme === 'system' ? 'theme-toggle-btn-active' : ''}` },
                            React.createElement(IMonitor, { size: 16 }),
                            React.createElement("span", null, "System")),
                        React.createElement("button", { onClick: () => applyTheme('ocean'), className: `theme-toggle-btn ${theme === 'ocean' ? 'theme-toggle-btn-active' : ''}` },
                            React.createElement(IWaves, { size: 16 }),
                            React.createElement("span", null, "Ocean"))),
                    React.createElement("button", { onClick: () => setCategoriesExpanded(!categoriesExpanded), className: "settings-dropdown-trigger" },
                        React.createElement("span", { className: "settings-section-label", style: { margin: 0 } }, "Categories"),
                        React.createElement("span", { className: `settings-dropdown-chevron ${categoriesExpanded ? 'settings-dropdown-chevron-open' : ''}` },
                            React.createElement(IChevD, { size: 16 }))),
                    categoriesExpanded && (React.createElement("div", { className: "settings-card", style: { padding: 0 } }, categories.map(c => (React.createElement("div", { key: c, className: "category-manage-row" }, manageCategoryEditing === c ? (React.createElement(React.Fragment, null,
                        React.createElement("input", { type: "text", autoFocus: true, value: manageCategoryInput, onChange: ev => setManageCategoryInput(ev.target.value), onKeyDown: ev => { if (ev.key === 'Enter')
                                renameCategory(c, manageCategoryInput); }, className: "flex-1 border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" }),
                        React.createElement("button", { onClick: () => renameCategory(c, manageCategoryInput), className: "icon-btn", "aria-label": "Save" },
                            React.createElement(ICheck, { size: 15 })),
                        React.createElement("button", { onClick: () => setManageCategoryEditing(null), className: "icon-btn", "aria-label": "Cancel" },
                            React.createElement(IX, { size: 15 })))) : confirmDeleteCategory === c ? (React.createElement(React.Fragment, null,
                        React.createElement("span", { className: "category-manage-confirm-text" },
                            "Delete \"",
                            c,
                            "\"? Its expenses move to ",
                            (c !== 'Other' && categories.includes('Other')) ? 'Other' : 'another category',
                            "."),
                        React.createElement("button", { onClick: () => deleteCategory(c), className: "link-btn", style: { color: '#ef4444' } }, "Delete"),
                        React.createElement("button", { onClick: () => setConfirmDeleteCategory(null), className: "link-btn" }, "Cancel"))) : (React.createElement(React.Fragment, null,
                        React.createElement("span", { className: "category-manage-dot", style: { background: categoryColors[c] } }),
                        React.createElement("span", { className: "category-manage-name" }, c),
                        React.createElement("button", { onClick: () => { setManageCategoryEditing(c); setManageCategoryInput(c); setError(''); }, className: "icon-btn", "aria-label": "Edit" },
                            React.createElement(IPencil, { size: 13 })),
                        React.createElement("button", { onClick: () => setConfirmDeleteCategory(c), className: "icon-btn", "aria-label": "Delete" },
                            React.createElement(ITrash, { size: 13 }))))))))),
                    error && manageCategoryEditing && React.createElement("p", { className: "text-red-500 text-xs mt-1" }, error),
                    React.createElement("div", { className: "settings-section-label" }, "Reports"),
                    React.createElement("div", { className: "settings-card", style: { padding: '0.85rem' } },
                        React.createElement("div", { className: "field-label" }, "Month"),
                        React.createElement("input", { type: "month", value: pdfReportMonth, max: currentMonth, onChange: e => setPdfReportMonth(e.target.value), className: "w-full border border-slate-200 rounded-lg px-2 py-2 text-sm text-slate-600 mb-3 focus:outline-none focus:ring-2 focus:ring-slate-300" }),
                        React.createElement("button", { onClick: downloadPdfReport, disabled: generatingPdf, className: "w-full flex items-center justify-center gap-1 rounded-lg py-2.5 text-sm font-medium bg-slate-800 text-white mb-2", style: { opacity: generatingPdf ? 0.7 : 1 } },
                            React.createElement(IFileText, { size: 16 }),
                            " ",
                            generatingPdf ? 'Generating…' : `Download ${pdfLabel} Report (PDF)`),
                        error && React.createElement("p", { className: "text-red-500 text-xs mb-2" }, error),
                        expenses.length > 0 && (React.createElement("button", { onClick: exportCSV, className: "w-full flex items-center justify-center gap-1 rounded-lg py-2.5 text-sm font-medium border border-slate-200 text-slate-600" },
                            React.createElement(IDownload, { size: 16 }),
                            " Export All Data (CSV)")))))))));
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App, null));
