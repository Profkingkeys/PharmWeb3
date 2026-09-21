CREATE TABLE IF NOT EXISTS agent_runs (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  agent_name VARCHAR(120) NOT NULL,
  status VARCHAR(32) NOT NULL,
  input_json JSON NULL,
  output_json JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_agent_runs_name_created (agent_name, created_at)
);

CREATE TABLE IF NOT EXISTS telemetry_events (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  trace_id VARCHAR(64) NOT NULL,
  event_name VARCHAR(120) NOT NULL,
  attributes JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_telemetry_trace (trace_id),
  INDEX idx_telemetry_created (created_at)
);
