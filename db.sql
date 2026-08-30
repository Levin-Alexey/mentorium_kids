-- =========================================
-- 1. ПОЛЬЗОВАТЕЛИ VK-БОТА
-- =========================================

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    vk_id INTEGER NOT NULL UNIQUE,
    first_name TEXT,

    email TEXT,
    phone TEXT,

    source TEXT NOT NULL DEFAULT 'vk_bot',
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,

    status TEXT NOT NULL DEFAULT 'active',

    first_started_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_started_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_activity_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- 2. ЗАЯВКИ НА ПРОБНЫЙ УРОК
-- =========================================

CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    -- Имя родителя и ребенка
    parent_name TEXT,
    child_name TEXT,

    -- Шаг 1. Направление
    -- Возможные значения: 'ai_start', 'vibecoding', 'ai_creative', 'ai_pro', 'need_help'
    course TEXT,

    -- Шаг 2. Возраст и опыт
    -- Возможные значения child_age_group: '10_12', '13_14', '15_17'
    child_age_group TEXT,
    -- Возможные значения experience_level: 'beginner', 'scratch_roblox', 'coding'
    experience_level TEXT,

    -- Шаг 3. Удобное время
    -- Возможные значения preferred_time_slot: 'weekday_17_19', 'weekday_19_21', 'weekend_11_15', 'weekend_16_19', 'custom'
    preferred_time_slot TEXT,
    preferred_time_custom TEXT,

    -- Шаг 4. Пожелания
    notes TEXT,

    -- Контакты
    phone TEXT,
    email TEXT,

    -- Состояние заявки
    -- Возможные значения: 'draft', 'completed', 'sent', 'failed'
    status TEXT NOT NULL DEFAULT 'draft',

    -- Интеграция с GetCourse
    -- Возможные значения: 'not_sent', 'sending', 'sent', 'error'
    getcourse_status TEXT NOT NULL DEFAULT 'not_sent',
    getcourse_user_id TEXT,
    getcourse_deal_id TEXT,
    getcourse_deal_number TEXT,
    getcourse_error TEXT,

    -- Время
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TEXT,
    sent_to_getcourse_at TEXT,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);


-- =========================================
-- 3. СОБЫТИЯ ВОРОНКИ
-- =========================================

CREATE TABLE IF NOT EXISTS lead_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,
    lead_id INTEGER,

    -- Ключевые события воронки:
    -- 'bot_started', 'trial_started', 'course_selected', 'child_name_entered',
    -- 'age_selected', 'experience_selected', 'time_selected', 'notes_completed',
    -- 'parent_name_entered', 'phone_entered', 'email_entered', 'lead_completed',
    -- 'getcourse_sent', 'getcourse_error'
    event_type TEXT NOT NULL,
    event_value TEXT,

    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (lead_id) REFERENCES leads(id)
        ON DELETE CASCADE
);


-- =========================================
-- ИНДЕКСЫ
-- =========================================

-- KV/состояние текущего шага хранит только текущее положение пользователя в воронке,
-- например: { "flow": "trial_registration", "step": "phone", "lead_id": 125 }

CREATE INDEX IF NOT EXISTS idx_users_last_activity
ON users(last_activity_at);

CREATE INDEX IF NOT EXISTS idx_users_utm_campaign
ON users(utm_campaign);

CREATE INDEX IF NOT EXISTS idx_leads_user_id
ON leads(user_id);

CREATE INDEX IF NOT EXISTS idx_leads_status
ON leads(status);

CREATE INDEX IF NOT EXISTS idx_leads_course
ON leads(course);

CREATE INDEX IF NOT EXISTS idx_leads_created_at
ON leads(created_at);

CREATE INDEX IF NOT EXISTS idx_leads_getcourse_status
ON leads(getcourse_status);

CREATE INDEX IF NOT EXISTS idx_lead_events_user_id
ON lead_events(user_id);

CREATE INDEX IF NOT EXISTS idx_lead_events_lead_id
ON lead_events(lead_id);

CREATE INDEX IF NOT EXISTS idx_lead_events_event_type
ON lead_events(event_type);