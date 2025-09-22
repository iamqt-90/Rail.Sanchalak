-- Trains Database
-- Contains train master data with train number as ID

CREATE TABLE IF NOT EXISTS trains (
    train_id VARCHAR(10) PRIMARY KEY,
    train_name VARCHAR(100) NOT NULL,
    train_type VARCHAR(50) NOT NULL,
    origin_station VARCHAR(10) NOT NULL,
    destination_station VARCHAR(10) NOT NULL,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert new trains from Pune hub
INSERT INTO trains (train_id, train_name, train_type, origin_station, destination_station, status)
VALUES 
('11001', 'Pune-Chennai Express', 'Superfast Express', 'PUNE', 'MAS', 'Active'),
('12001', 'Pune-Bengaluru Express', 'Superfast Express', 'PUNE', 'SBC', 'Active'),
('13001', 'Pune-Hyderabad Express', 'Superfast Express', 'PUNE', 'SC', 'Active');
