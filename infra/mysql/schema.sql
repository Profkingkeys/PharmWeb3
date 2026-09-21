CREATE TABLE IF NOT EXISTS tenants (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(160) NOT NULL,
  plan VARCHAR(40) NOT NULL DEFAULT 'starter',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS agent_runs (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  tenant_id BIGINT UNSIGNED NULL,
  agent_name VARCHAR(120) NOT NULL,
  status VARCHAR(32) NOT NULL,
  input_json JSON NULL,
  output_json JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_agent_created(agent_name, created_at),
  CONSTRAINT fk_agent_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS telemetry_events (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  trace_id CHAR(32) NOT NULL,
  span_id CHAR(16) NULL,
  event_name VARCHAR(120) NOT NULL,
  attributes JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_telemetry_trace(trace_id),
  INDEX idx_telemetry_created(created_at)
);
