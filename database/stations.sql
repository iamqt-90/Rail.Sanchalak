-- 1️⃣ Pune (hub)
INSERT INTO stations (
    station_code, station_name, local_name, zone, division, elevation, latitude, longitude,
    station_type, station_category, number_of_platforms, track_type, address,
    nearby_airport, airport_distance_km, number_of_halting_trains, number_of_originating_trains, number_of_terminating_trains
) VALUES
('PUNE', 'Pune Jn', 'पुणे जंक्शन', 'CR', 'Pune', 560, 18.5285, 73.8748,
 'Junction', 'NSG-1', 6, 'Double Electric-Line', 
 'Jn Pt: DD/MFJ/KYN, Tel: 020 26126575, HH Prince Aga Khan Road, Opp to Hotel Sheraton Grand, Pune 411001',
 'Pune Lohegaon Airport (PNQ)', 8, 156, 82, 84);

-- 2️⃣ Pune → Chennai intermediate stations
INSERT INTO stations (
    station_code, station_name, local_name, zone, division, elevation, latitude, longitude,
    station_type, station_category, number_of_platforms, track_type
) VALUES
('STR', 'Satara', 'सातारा', 'CR', 'Pune', 742, 17.6886, 73.9950, 'Junction', 'NSG-3', 3, 'Double Electric-Line'),
('KAR', 'Karad', 'कराड', 'CR', 'Pune', 586, 17.2833, 74.2000, 'Regular', 'NSG-4', 2, 'Double Electric-Line'),
('PNL', 'Pandharpur', 'पंढरपूर', 'CR', 'Solapur', 493, 17.6789, 75.0178, 'Regular', 'NSG-4', 2, 'Double Electric-Line'),
('SOL', 'Solapur', 'सोलापुर', 'CR', 'Solapur', 457, 17.6599, 75.9064, 'Junction', 'NSG-2', 4, 'Double Electric-Line'),
('TKL', 'Tandulwadi', 'टंडुलवाडी', 'SR', 'Arakkonam', 123, 18.2000, 77.0000, 'Halt', 'HG-3', 1, 'Single Line'),
('AJJ', 'Arakkonam', 'अरक्कोनम', 'SR', 'Arakkonam', 108, 13.0000, 79.6000, 'Junction', 'NSG-3', 3, 'Double Electric-Line'),
('KPD', 'Katpadi', 'कटपडी', 'SR', 'Katpadi', 170, 12.9600, 79.1500, 'Junction', 'NSG-2', 4, 'Double Electric-Line'),
('VR', 'Vellore', 'वेल्लोर', 'SR', 'Katpadi', 216, 12.9167, 79.1333, 'Regular', 'NSG-3', 2, 'Double Electric-Line');

-- 3️⃣ Pune → Bengaluru intermediate stations
INSERT INTO stations (
    station_code, station_name, local_name, zone, division, elevation, latitude, longitude,
    station_type, station_category, number_of_platforms, track_type
) VALUES
('KOP', 'Koppal', 'कोप्पल', 'SWR', 'Hubli', 510, 15.3450, 76.1500, 'Regular', 'NSG-4', 2, 'Double Electric-Line'),
('BEL', 'Belagavi', 'बेलगावी', 'SWR', 'Belagavi', 751, 15.8497, 74.4977, 'Junction', 'NSG-2', 3, 'Double Electric-Line'),
('CHN', 'Channarayapatna', 'चान्नारायपटन', 'SWR', 'Mysuru', 812, 12.9530, 76.4980, 'Regular', 'NSG-3', 2, 'Double Electric-Line');

-- 4️⃣ Pune → Hyderabad intermediate stations
INSERT INTO stations (
    station_code, station_name, local_name, zone, division, elevation, latitude, longitude,
    station_type, station_category, number_of_platforms, track_type
) VALUES
('KLT', 'Kalaburagi', 'कलाबुरगी', 'SCR', 'Kalaburagi', 429, 17.3297, 76.8343, 'Junction', 'NSG-2', 3, 'Double Electric-Line'),
('NZD', 'Nizamabad', 'निज़ामाबाद', 'SCR', 'Nizamabad', 392, 18.6700, 78.1000, 'Junction', 'NSG-3', 3, 'Double Electric-Line'),
('SC', 'Secunderabad', 'सिकंदराबाद', 'SCR', 'Secunderabad', 531, 17.4397, 78.4983, 'Junction', 'NSG-1', 5, 'Double Electric-Line');
