-- Track Infrastructure Database for Pune Hub & 3 Corridors

-- 1️⃣ Tables
CREATE TABLE IF NOT EXISTS track_segments (
    id SERIAL PRIMARY KEY,
    segment_id VARCHAR(20) UNIQUE NOT NULL,
    from_station VARCHAR(10) NOT NULL,
    to_station VARCHAR(10) NOT NULL,
    distance_km INTEGER NOT NULL,
    max_speed_kmh INTEGER,
    track_type VARCHAR(30) DEFAULT 'Broad Gauge',
    gauge_mm INTEGER DEFAULT 1676,
    electrified BOOLEAN DEFAULT TRUE,
    double_line BOOLEAN DEFAULT TRUE,
    zone VARCHAR(10),
    section_name VARCHAR(50),
    gradient_percent DECIMAL(4,2),
    curvature_degree DECIMAL(5,2),
    status VARCHAR(20) DEFAULT 'Operational',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS signals (
    id SERIAL PRIMARY KEY,
    signal_id VARCHAR(20) UNIQUE NOT NULL,
    signal_type VARCHAR(30),
    station_code VARCHAR(10),
    track_segment_id VARCHAR(20),
    direction VARCHAR(10),
    signal_status VARCHAR(20) DEFAULT 'Green',
    automatic BOOLEAN DEFAULT TRUE,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS switches_points (
    id SERIAL PRIMARY KEY,
    switch_id VARCHAR(20) UNIQUE NOT NULL,
    station_code VARCHAR(10),
    switch_type VARCHAR(30),
    position VARCHAR(10) DEFAULT 'Normal',
    remote_controlled BOOLEAN DEFAULT TRUE,
    interlocked BOOLEAN DEFAULT TRUE,
    status VARCHAR(20) DEFAULT 'Operational',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS level_crossings (
    id SERIAL PRIMARY KEY,
    crossing_id VARCHAR(20) UNIQUE NOT NULL,
    crossing_name VARCHAR(100),
    track_segment_id VARCHAR(20),
    crossing_type VARCHAR(30),
    gate_status VARCHAR(20) DEFAULT 'Closed',
    road_category VARCHAR(30),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS platforms (
    id SERIAL PRIMARY KEY,
    platform_id VARCHAR(20) UNIQUE NOT NULL,
    station_code VARCHAR(10) NOT NULL,
    platform_number VARCHAR(5) NOT NULL,
    platform_length_m INTEGER,
    platform_height_mm INTEGER DEFAULT 760,
    covered_length_m INTEGER,
    facilities JSONB,
    accessibility BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'Operational',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2️⃣ Pune Junction Platforms, Signals, Switches (common hub)
INSERT INTO platforms (platform_id, station_code, platform_number, platform_length_m, covered_length_m, facilities, accessibility) VALUES
('PUNE-PF1', 'PUNE', '1', 450, 300, '{"waiting_room": true, "food_stall": true, "water": true}', TRUE),
('PUNE-PF2', 'PUNE', '2', 450, 300, '{"waiting_room": true, "food_stall": true, "water": true}', TRUE),
('PUNE-PF3', 'PUNE', '3', 450, 300, '{"waiting_room": true, "food_stall": true, "water": true}', TRUE),
('PUNE-PF4', 'PUNE', '4', 400, 250, '{"waiting_room": false, "food_stall": true, "water": true}', FALSE);

INSERT INTO signals (signal_id, signal_type, station_code, direction, automatic) VALUES
('PUNE-HS-UP', 'Home Signal', 'PUNE', 'UP', TRUE),
('PUNE-HS-DN', 'Home Signal', 'PUNE', 'DOWN', TRUE),
('PUNE-SS-1', 'Starter Signal', 'PUNE', 'UP', TRUE),
('PUNE-SS-2', 'Starter Signal', 'PUNE', 'DOWN', TRUE),
('PUNE-AS-1', 'Advanced Starter', 'PUNE', 'UP', TRUE),
('PUNE-AS-2', 'Advanced Starter', 'PUNE', 'DOWN', TRUE);

INSERT INTO switches_points (switch_id, station_code, switch_type, remote_controlled, interlocked) VALUES
('PUNE-SW-01', 'PUNE', 'Turnout', TRUE, TRUE),
('PUNE-SW-02', 'PUNE', 'Turnout', TRUE, TRUE),
('PUNE-SW-03', 'PUNE', 'Crossover', TRUE, TRUE),
('PUNE-SW-04', 'PUNE', 'Diamond Crossing', TRUE, TRUE);

-- 3️⃣ Track Segments: Pune → Chennai (intermediate stations included)
INSERT INTO track_segments (segment_id, from_station, to_station, distance_km, max_speed_kmh, zone, section_name) VALUES
('PUNE-SAT', 'PUNE', 'STR', 112, 110, 'CR', 'Pune-Satara'),
('STR-KRD', 'STR', 'KAR', 103, 110, 'CR', 'Satara-Karad'),
('KRD-PNL', 'KAR', 'PNL', 95, 110, 'CR', 'Karad-Pandharpur'),
('PNL-SOL', 'PNL', 'SOL', 90, 110, 'CR', 'Pandharpur-Solapur'),
('SOL-TKL', 'SOL', 'TKL', 120, 110, 'CR', 'Solapur-Tandulwadi'),
('TKL-AJJ', 'TKL', 'AJJ', 85, 110, 'SR', 'Tandulwadi-Arakkonam'),
('AJJ-KPD', 'AJJ', 'KPD', 61, 110, 'SR', 'Arakkonam-Katpadi'),
('KPD-VR', 'KPD', 'VR', 50, 110, 'SR', 'Katpadi-Vellore'),
('VR-MAS', 'VR', 'MAS', 83, 110, 'SR', 'Vellore-Chennai');

-- 4️⃣ Track Segments: Pune → Bengaluru (intermediate stations included)
INSERT INTO track_segments (segment_id, from_station, to_station, distance_km, max_speed_kmh, zone, section_name) VALUES
('PUNE-SAT', 'PUNE', 'STR', 112, 110, 'CR', 'Pune-Satara'),
('STR-KRD', 'STR', 'KAR', 103, 110, 'CR', 'Satara-Karad'),
('KAR-KOP', 'KAR', 'KOP', 110, 110, 'CR', 'Karad-Koppal'),
('KOP-BEL', 'KOP', 'BEL', 120, 110, 'SWR', 'Koppal-Belagavi'),
('BEL-CHN', 'BEL', 'CHN', 90, 110, 'SWR', 'Belagavi-Channarayapatna'),
('CHN-SBC', 'CHN', 'SBC', 140, 110, 'SWR', 'Channarayapatna-Bengaluru');

-- 5️⃣ Track Segments: Pune → Hyderabad (intermediate stations included)
INSERT INTO track_segments (segment_id, from_station, to_station, distance_km, max_speed_kmh, zone, section_name) VALUES
('PUNE-KLT', 'PUNE', 'KLT', 230, 110, 'CR', 'Pune-Kalaburagi'),
('KLT-NZD', 'KLT', 'NZD', 220, 110, 'SCR', 'Kalaburagi-Nizamabad'),
('NZD-SC', 'NZD', 'SC', 278, 110, 'SCR', 'Nizamabad-Secunderabad');

