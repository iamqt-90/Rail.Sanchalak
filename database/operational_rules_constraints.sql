-- Operational Rules and Constraints Database
-- Contains safety rules, operational procedures, priority rules, and system constraints

CREATE TABLE IF NOT EXISTS train_types (
    id SERIAL PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL,
    priority_level INTEGER NOT NULL, -- 1=Highest, 5=Lowest
    max_speed_kmh INTEGER,
    description VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS operational_rules (
    id SERIAL PRIMARY KEY,
    rule_name VARCHAR(100) NOT NULL,
    rule_category VARCHAR(50), -- 'Safety', 'Priority', 'Speed', 'Weather', 'Emergency'
    conditions JSONB,
    actions JSONB,
    priority INTEGER DEFAULT 1,
    active BOOLEAN DEFAULT TRUE,
    zone VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS priority_rules (
    id SERIAL PRIMARY KEY,
    rule_name VARCHAR(100) NOT NULL,
    train_type_1 VARCHAR(50),
    train_type_2 VARCHAR(50),
    priority_winner VARCHAR(50), -- Which train type gets priority
    conditions JSONB,
    crossing_type VARCHAR(30),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS speed_restrictions (
    id SERIAL PRIMARY KEY,
    restriction_name VARCHAR(100) NOT NULL,
    from_station VARCHAR(10),
    to_station VARCHAR(10),
    max_speed_kmh INTEGER NOT NULL,
    reason VARCHAR(100),
    weather_dependent BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    effective_from TIMESTAMP,
    effective_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert train types with priority levels
INSERT INTO train_types (type_name, priority_level, max_speed_kmh, description) VALUES
('Superfast Express', 2, 130, 'Long distance express trains with limited stops'),
('Mail Express', 3, 110, 'Regular express trains with more stops'),
('Passenger', 4, 80, 'Local passenger trains with frequent stops'),
('Freight Priority', 3, 75, 'High priority freight trains'),
('Freight Regular', 5, 60, 'Regular freight trains'),
('Rajdhani/Shatabdi', 1, 160, 'Premium high-speed trains'),
('Emergency/Rescue', 1, 100, 'Emergency and rescue trains');

-- Insert operational rules
INSERT INTO operational_rules (rule_name, rule_category, conditions, actions, priority, zone) VALUES
('Superfast Express Priority', 'Priority', '{"train_type": "Superfast Express"}', '{"action": "Grant priority over passenger trains", "delay_threshold": 15}', 1, 'ALL'),
('Weather Speed Restriction', 'Weather', '{"visibility_km": {"<": 2}, "precipitation_mm": {">": 10}}', '{"action": "Reduce speed to 60 kmh", "alert_level": "High"}', 1, 'ALL'),
('Junction Priority Rule', 'Priority', '{"location_type": "Junction"}', '{"action": "Express trains get priority over passenger trains"}', 2, 'ALL'),
('Night Safety Rule', 'Safety', '{"time": {"between": ["22:00", "06:00"]}}', '{"action": "Enhanced signal checking", "speed_limit": 80}', 1, 'ALL');

-- Insert priority rules for crossings
INSERT INTO priority_rules (rule_name, train_type_1, train_type_2, priority_winner, conditions, crossing_type) VALUES
('Express vs Passenger', 'Superfast Express', 'Passenger', 'Superfast Express', '{"delay_difference": {"<": 30}}', 'Junction'),
('Rajdhani Priority', 'Rajdhani/Shatabdi', 'Superfast Express', 'Rajdhani/Shatabdi', '{}', 'All'),
('Emergency Override', 'Emergency/Rescue', 'Superfast Express', 'Emergency/Rescue', '{}', 'All'),
('Freight vs Passenger', 'Freight Priority', 'Passenger', 'Freight Priority', '{"time": {"between": ["02:00", "06:00"]}}', 'Junction');

-- Insert speed restrictions for Gyan Ganga route
INSERT INTO speed_restrictions (restriction_name, from_station, to_station, max_speed_kmh, reason, weather_dependent) VALUES
('Monsoon Speed Limit - Pune-Manmad', 'PUNE', 'MMR', 80, 'Monsoon safety precaution', TRUE),
('Ghat Section Speed Limit', 'BSL', 'KNW', 75, 'Hilly terrain safety', FALSE),
('Urban Area Speed Limit - Banaras', 'GYN', 'BSBS', 60, 'Urban area safety', FALSE);