-- Real-time Train Movement Data Database
-- Contains live train positions, speeds, directions, and movement tracking data

CREATE TABLE IF NOT EXISTS train_positions (
    id SERIAL PRIMARY KEY,
    train_id VARCHAR(10) NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    current_station VARCHAR(10),
    next_station VARCHAR(10),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    speed_kmh INTEGER,
    direction DECIMAL(5, 2),
    delay_minutes INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'Running',
    signal_status VARCHAR(20) DEFAULT 'Green',
    communication_status VARCHAR(20) DEFAULT 'Active'
);

CREATE TABLE IF NOT EXISTS train_status_log (
    id SERIAL PRIMARY KEY,
    train_id VARCHAR(10) NOT NULL,
    station_code VARCHAR(10),
    event_type VARCHAR(20), -- 'Arrival', 'Departure', 'Halt'
    scheduled_time TIME,
    actual_time TIME,
    delay_minutes INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample real-time data for 22131 Gyan Ganga SF Express
INSERT INTO train_positions (train_id, current_station, next_station, speed_kmh, delay_minutes, status) VALUES
('22131', 'PUNE', 'DDCC', 0, 0, 'At Platform');

-- Sample status log entries
INSERT INTO train_status_log (train_id, station_code, event_type, scheduled_time, actual_time, delay_minutes) VALUES
('22131', 'PUNE', 'Departure', '16:15', '16:15', 0);