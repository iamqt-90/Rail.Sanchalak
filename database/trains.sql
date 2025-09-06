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

-- Insert train data
INSERT INTO trains (train_id, train_name, train_type, origin_station, destination_station, status)
VALUES ('22131', 'Gyan Ganga SF Exp', 'Superfast Express', 'PUNE', 'PRYJ', 'Active');