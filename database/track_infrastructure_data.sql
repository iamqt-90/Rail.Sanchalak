-- Track Infrastructure Data Database
-- Contains track segments, signals, switches, crossings, and infrastructure elements

CREATE TABLE IF NOT EXISTS track_segments (
    id SERIAL PRIMARY KEY,
    segment_id VARCHAR(20) UNIQUE NOT NULL,
    from_station VARCHAR(10) NOT NULL,
    to_station VARCHAR(10) NOT NULL,
    distance_km INTEGER NOT NULL,
    max_speed_kmh INTEGER,
    track_type VARCHAR(30) DEFAULT 'Broad Gauge',
    gauge_mm INTEGER DEFAULT 1676, -- Broad gauge in mm
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
    signal_type VARCHAR(30), -- Home, Distant, Starter, Advanced Starter
    station_code VARCHAR(10),
    track_segment_id VARCHAR(20),
    direction VARCHAR(10), -- UP, DOWN, BOTH
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
    switch_type VARCHAR(30), -- Turnout, Crossover, Diamond Crossing
    position VARCHAR(10) DEFAULT 'Normal', -- Normal, Reverse
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
    crossing_type VARCHAR(30), -- Manned, Unmanned, Automatic
    gate_status VARCHAR(20) DEFAULT 'Closed', -- Open, Closed
    road_category VARCHAR(30), -- National Highway, State Highway, Village Road
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
    platform_height_mm INTEGER DEFAULT 760, -- Standard height
    covered_length_m INTEGER,
    facilities JSONB, -- Waiting room, food stall, etc.
    accessibility BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'Operational',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert track segments for Gyan Ganga SF Express route
INSERT INTO track_segments (segment_id, from_station, to_station, distance_km, max_speed_kmh, zone, section_name, double_line) VALUES
('PUNE-DDCC', 'PUNE', 'DDCC', 73, 110, 'CR', 'Pune-Daund', TRUE),
('DDCC-ANG', 'DDCC', 'ANG', 82, 110, 'CR', 'Daund-Ahmednagar', TRUE),
('ANG-BAP', 'ANG', 'BAP', 67, 110, 'CR', 'Ahmednagar-Belapur', TRUE),
('BAP-KPG', 'BAP', 'KPG', 44, 110, 'CR', 'Belapur-Kopargaon', TRUE),
('KPG-MMR', 'KPG', 'MMR', 42, 110, 'CR', 'Kopargaon-Manmad', TRUE),
('MMR-BSL', 'MMR', 'BSL', 184, 110, 'CR', 'Manmad-Bhusaval', TRUE),
('BSL-KNW', 'BSL', 'KNW', 124, 110, 'CR', 'Bhusaval-Khandwa', TRUE),
('KNW-HD', 'KNW', 'HD', 108, 110, 'WCR', 'Khandwa-Harda', TRUE),
('HD-ET', 'HD', 'ET', 75, 110, 'WCR', 'Harda-Itarsi', TRUE),
('ET-PPI', 'ET', 'PPI', 67, 110, 'WCR', 'Itarsi-Pipariya', TRUE),
('PPI-NU', 'PPI', 'NU', 94, 110, 'WCR', 'Pipariya-Narsinghpur', TRUE),
('NU-JBP', 'NU', 'JBP', 84, 110, 'WCR', 'Narsinghpur-Jabalpur', TRUE),
('JBP-KTE', 'JBP', 'KTE', 91, 110, 'WCR', 'Jabalpur-Katni', TRUE),
('KTE-STA', 'KTE', 'STA', 98, 110, 'WCR', 'Katni-Satna', TRUE),
('STA-PRYJ', 'STA', 'PRYJ', 177, 110, 'NCR', 'Satna-Prayagraj', TRUE),
('PRYJ-PRRB', 'PRYJ', 'PRRB', 3, 60, 'NER', 'Prayagraj-Rambag', TRUE),
('PRRB-GYN', 'PRRB', 'GYN', 62, 110, 'NER', 'Rambag-Gyanpur', TRUE),
('GYN-BSBS', 'GYN', 'BSBS', 56, 110, 'NER', 'Gyanpur-Banaras', TRUE);

-- Insert platform data for Pune Junction
INSERT INTO platforms (platform_id, station_code, platform_number, platform_length_m, covered_length_m, facilities, accessibility) VALUES
('PUNE-PF1', 'PUNE', '1', 450, 300, '{"waiting_room": true, "food_stall": true, "water": true}', TRUE),
('PUNE-PF2', 'PUNE', '2', 450, 300, '{"waiting_room": true, "food_stall": true, "water": true}', TRUE),
('PUNE-PF3', 'PUNE', '3', 450, 300, '{"waiting_room": true, "food_stall": true, "water": true}', TRUE),
('PUNE-PF4', 'PUNE', '4', 400, 250, '{"waiting_room": false, "food_stall": true, "water": true}', FALSE),
('PUNE-PF5', 'PUNE', '5', 400, 250, '{"waiting_room": false, "food_stall": true, "water": true}', FALSE),
('PUNE-PF6', 'PUNE', '6', 400, 250, '{"waiting_room": false, "food_stall": false, "water": true}', FALSE);

-- Insert signal data for Pune Junction area
INSERT INTO signals (signal_id, signal_type, station_code, direction, automatic) VALUES
('PUNE-HS-UP', 'Home Signal', 'PUNE', 'UP', TRUE),
('PUNE-HS-DN', 'Home Signal', 'PUNE', 'DOWN', TRUE),
('PUNE-SS-1', 'Starter Signal', 'PUNE', 'UP', TRUE),
('PUNE-SS-2', 'Starter Signal', 'PUNE', 'DOWN', TRUE),
('PUNE-AS-1', 'Advanced Starter', 'PUNE', 'UP', TRUE),
('PUNE-AS-2', 'Advanced Starter', 'PUNE', 'DOWN', TRUE);

-- Insert switch/points data for Pune Junction
INSERT INTO switches_points (switch_id, station_code, switch_type, remote_controlled, interlocked) VALUES
('PUNE-SW-01', 'PUNE', 'Turnout', TRUE, TRUE),
('PUNE-SW-02', 'PUNE', 'Turnout', TRUE, TRUE),
('PUNE-SW-03', 'PUNE', 'Crossover', TRUE, TRUE),
('PUNE-SW-04', 'PUNE', 'Diamond Crossing', TRUE, TRUE);

-- Platforms for New Delhi (NDLS)
INSERT INTO platforms (platform_id, station_code, platform_number, platform_length_m, covered_length_m, facilities, accessibility) VALUES
('NDLS-PF1', 'NDLS', '1', 550, 400, '{"waiting_room": true, "food_stall": true, "water": true}', TRUE),
('NDLS-PF2', 'NDLS', '2', 550, 400, '{"waiting_room": true, "food_stall": true, "water": true}', TRUE),
('NDLS-PF3', 'NDLS', '3', 550, 400, '{"waiting_room": true, "food_stall": false, "water": true}', TRUE),
('NDLS-PF4', 'NDLS', '4', 500, 350, '{"waiting_room": false, "food_stall": true, "water": true}', TRUE),
('NDLS-PF5', 'NDLS', '5', 500, 350, '{"waiting_room": false, "food_stall": true, "water": false}', FALSE);

-- Signals for New Delhi
INSERT INTO signals (signal_id, signal_type, station_code, direction, automatic) VALUES
('NDLS-HS-UP', 'Home Signal', 'NDLS', 'UP', TRUE),
('NDLS-HS-DN', 'Home Signal', 'NDLS', 'DOWN', TRUE),
('NDLS-SS-1', 'Starter Signal', 'NDLS', 'UP', TRUE),
('NDLS-SS-2', 'Starter Signal', 'NDLS', 'DOWN', TRUE),
('NDLS-AS-1', 'Advanced Starter', 'NDLS', 'UP', TRUE),
('NDLS-AS-2', 'Advanced Starter', 'NDLS', 'DOWN', TRUE);

-- Switches for New Delhi
INSERT INTO switches_points (switch_id, station_code, switch_type, remote_controlled, interlocked) VALUES
('NDLS-SW-01', 'NDLS', 'Turnout', TRUE, TRUE),
('NDLS-SW-02', 'NDLS', 'Turnout', TRUE, TRUE),
('NDLS-SW-03', 'NDLS', 'Crossover', TRUE, TRUE),
('NDLS-SW-04', 'NDLS', 'Diamond Crossing', TRUE, TRUE);

-- Platforms for Howrah (HWH)
INSERT INTO platforms (platform_id, station_code, platform_number, platform_length_m, covered_length_m, facilities, accessibility) VALUES
('HWH-PF1', 'HWH', '1', 600, 450, '{"waiting_room": true, "food_stall": true, "water": true}', TRUE),
('HWH-PF2', 'HWH', '2', 600, 450, '{"waiting_room": true, "food_stall": false, "water": true}', TRUE),
('HWH-PF3', 'HWH', '3', 550, 400, '{"waiting_room": false, "food_stall": true, "water": true}', TRUE),
('HWH-PF4', 'HWH', '4', 550, 400, '{"waiting_room": false, "food_stall": true, "water": false}', FALSE),
('HWH-PF5', 'HWH', '5', 500, 350, '{"waiting_room": false, "food_stall": false, "water": true}', FALSE);

-- Signals for Howrah
INSERT INTO signals (signal_id, signal_type, station_code, direction, automatic) VALUES
('HWH-HS-UP', 'Home Signal', 'HWH', 'UP', TRUE),
('HWH-HS-DN', 'Home Signal', 'HWH', 'DOWN', TRUE),
('HWH-SS-1', 'Starter Signal', 'HWH', 'UP', TRUE),
('HWH-SS-2', 'Starter Signal', 'HWH', 'DOWN', TRUE),
('HWH-AS-1', 'Advanced Starter', 'HWH', 'UP', TRUE),
('HWH-AS-2', 'Advanced Starter', 'HWH', 'DOWN', TRUE);

-- Switches for Howrah
INSERT INTO switches_points (switch_id, station_code, switch_type, remote_controlled, interlocked) VALUES
('HWH-SW-01', 'HWH', 'Turnout', TRUE, TRUE),
('HWH-SW-02', 'HWH', 'Turnout', TRUE, TRUE),
('HWH-SW-03', 'HWH', 'Crossover', TRUE, TRUE),
('HWH-SW-04', 'HWH', 'Diamond Crossing', TRUE, TRUE);

-- Platforms for CSMT Mumbai
INSERT INTO platforms (platform_id, station_code, platform_number, platform_length_m, covered_length_m, facilities, accessibility) VALUES
('CSMT-PF1', 'CSMT', '1', 500, 350, '{"waiting_room": true, "food_stall": true, "water": true}', TRUE),
('CSMT-PF2', 'CSMT', '2', 500, 350, '{"waiting_room": true, "food_stall": true, "water": true}', TRUE),
('CSMT-PF3', 'CSMT', '3', 500, 350, '{"waiting_room": true, "food_stall": false, "water": true}', TRUE),
('CSMT-PF4', 'CSMT', '4', 450, 300, '{"waiting_room": false, "food_stall": true, "water": true}', FALSE),
('CSMT-PF5', 'CSMT', '5', 450, 300, '{"waiting_room": false, "food_stall": false, "water": true}', FALSE);

-- Signals for CSMT
INSERT INTO signals (signal_id, signal_type, station_code, direction, automatic) VALUES
('CSMT-HS-UP', 'Home Signal', 'CSMT', 'UP', TRUE),
('CSMT-HS-DN', 'Home Signal', 'CSMT', 'DOWN', TRUE),
('CSMT-SS-1', 'Starter Signal', 'CSMT', 'UP', TRUE),
('CSMT-SS-2', 'Starter Signal', 'CSMT', 'DOWN', TRUE),
('CSMT-AS-1', 'Advanced Starter', 'CSMT', 'UP', TRUE),
('CSMT-AS-2', 'Advanced Starter', 'CSMT', 'DOWN', TRUE);

-- Switches for CSMT
INSERT INTO switches_points (switch_id, station_code, switch_type, remote_controlled, interlocked) VALUES
('CSMT-SW-01', 'CSMT', 'Turnout', TRUE, TRUE),
('CSMT-SW-02', 'CSMT', 'Turnout', TRUE, TRUE),
('CSMT-SW-03', 'CSMT', 'Crossover', TRUE, TRUE),
('CSMT-SW-04', 'CSMT', 'Diamond Crossing', TRUE, TRUE);
