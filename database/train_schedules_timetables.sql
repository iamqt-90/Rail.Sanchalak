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
INSERT INTO train_schedules (train_id, station_code, station_name, arrival_time, departure_time, halt_duration, platform, day, distance_km, speed_kmh, elevation, zone, sequence_number) VALUES
('22131', 'PUNE', 'Pune Jn', NULL, '16:15', NULL, '1,3', 1, 0, 69, 560, 'CR', 1),
('22131', 'DDCC', 'Daund Chord Line', '17:18', '17:20', '2m', NULL, 1, 73, 73, 525, 'CR', 2),
('22131', 'ANG', 'Ahmednagar Jn', '18:27', '18:30', '3m', NULL, 1, 155, 60, 640, 'CR', 3),
('22131', 'BAP', 'Belapur', '19:37', '19:40', '3m', NULL, 1, 222, 57, 535, 'CR', 4),
('22131', 'KPG', 'Kopargaon', '20:27', '20:30', '3m', NULL, 1, 266, 34, 550, 'CR', 5),
('22131', 'MMR', 'Manmad Jn', '21:45', '21:50', '5m', '1,2', 1, 308, 79, NULL, 'CR', 6),
('22131', 'BSL', 'Bhusaval Jn', '00:10', '00:15', '5m', '5,6', 2, 492, 63, 205, 'CR', 7),
('22131', 'KNW', 'Khandwa Jn', '02:12', '02:15', '3m', '4', 2, 616, 74, 302, 'CR', 8),
('22131', 'HD', 'Harda', '03:43', '03:48', '5m', '2', 2, 724, 44, 341, 'WCR', 9),
('22131', 'ET', 'Itarsi Jn', '05:30', '05:40', '10m', '4,5', 2, 799, 83, 329, 'WCR', 10),
('22131', 'PPI', 'Pipariya', '06:28', '06:30', '2m', NULL, 2, 866, 89, 335, 'WCR', 11),
('22131', 'NU', 'Narsinghpur', '07:33', '07:35', '2m', NULL, 2, 960, 67, 364, 'WCR', 12),
('22131', 'JBP', 'Jabalpur', '08:50', '09:00', '10m', '4', 2, 1044, 73, 411, 'WCR', 13),
('22131', 'KTE', 'Katni Jn', '10:15', '10:20', '5m', '2', 2, 1135, 51, 381, 'WCR', 14),
('22131', 'STA', 'Satna Jn', '12:15', '12:20', '5m', '2', 2, 1233, 38, 315, 'WCR', 15),
('22131', 'PRYJ', 'Prayagraj Jn', '17:00', '17:20', '20m', '7,8', 2, 1410, 15, 97, 'NCR', 16)