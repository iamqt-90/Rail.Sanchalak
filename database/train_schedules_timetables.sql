-- Train Schedules and Timetables Database
-- Contains all train scheduling data, departure/arrival times, and timetable information

CREATE TABLE IF NOT EXISTS train_schedules (
    id SERIAL PRIMARY KEY,
    train_id VARCHAR(10) NOT NULL,
    station_code VARCHAR(10) NOT NULL,
    station_name VARCHAR(100) NOT NULL,
    arrival_time TIME,
    departure_time TIME,
    halt_duration VARCHAR(10),
    platform VARCHAR(10),
    day INTEGER NOT NULL,
    distance_km INTEGER,
    speed_kmh INTEGER,
    elevation INTEGER,
    zone VARCHAR(10),
    sequence_number INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert schedule data for 22131 Gyan Ganga SF Express
INSERT INTO train_schedules 
(train_id, station_code, station_name, arrival_time, departure_time, halt_duration, platform, day, distance_km, speed_kmh, elevation, zone, sequence_number) VALUES
('11001', 'PUNE', 'Pune Jn', NULL, '06:00', NULL, '1,2', 1, 0, 69, 560, 'CR', 1),
('11001', 'STR', 'Satara', '07:15', '07:18', '3m', '1', 1, 115, 75, 742, 'CR', 2),
('11001', 'KAR', 'Karad', '08:10', '08:12', '2m', '2', 1, 185, 60, 586, 'CR', 3),
('11001', 'PNL', 'Pandharpur', '09:20', '09:23', '3m', '1', 1, 270, 70, 493, 'CR', 4),
('11001', 'SOL', 'Solapur', '10:40', '10:45', '5m', '3', 1, 370, 80, 457, 'CR', 5),
('11001', 'TKL', 'Tandulwadi', '12:15', '12:17', '2m', '1', 1, 470, 70, 123, 'SR', 6),
('11001', 'AJJ', 'Arakkonam', '15:30', '15:35', '5m', '2', 1, 780, 80, 108, 'SR', 7),
('11001', 'KPD', 'Katpadi', '16:05', '16:10', '5m', '3', 1, 820, 75, 170, 'SR', 8),
('11001', 'VR', 'Vellore', '16:50', '16:52', '2m', '2', 1, 855, 60, 216, 'SR', 9),
('11001', 'MAS', 'Chennai Central', '19:30', NULL, NULL, '1,2', 1, 1000, 70, 6, 'SR', 10);

INSERT INTO train_schedules 
(train_id, station_code, station_name, arrival_time, departure_time, halt_duration, platform, day, distance_km, speed_kmh, elevation, zone, sequence_number) VALUES
('12001', 'PUNE', 'Pune Jn', NULL, '06:00', NULL, '1,2', 1, 0, 69, 560, 'CR', 1),
('12001', 'KOP', 'Koppal', '08:00', '08:03', '3m', '1', 1, 250, 75, 510, 'SWR', 2),
('12001', 'BEL', 'Belagavi', '09:30', '09:35', '5m', '2', 1, 330, 80, 751, 'SWR', 3),
('12001', 'CHN', 'Channarayapatna', '11:30', '11:32', '2m', '1', 1, 430, 70, 812, 'SWR', 4),
('12001', 'SBC', 'Bengaluru City', '13:30', NULL, NULL, '1,2', 1, 530, 75, 920, 'SWR', 5);

INSERT INTO train_schedules 
(train_id, station_code, station_name, arrival_time, departure_time, halt_duration, platform, day, distance_km, speed_kmh, elevation, zone, sequence_number) VALUES
('13001', 'PUNE', 'Pune Jn', NULL, '06:00', NULL, '1,2', 1, 0, 69, 560, 'CR', 1),
('13001', 'KLT', 'Kalaburagi', '09:00', '09:05', '5m', '1', 1, 380, 70, 429, 'SCR', 2),
('13001', 'NZD', 'Nizamabad', '12:00', '12:05', '5m', '2', 1, 620, 75, 392, 'SCR', 3),
('13001', 'SC', 'Secunderabad', '14:30', NULL, NULL, '1,2', 1, 780, 80, 531, 'SCR', 4);
