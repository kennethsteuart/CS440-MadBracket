DELETE FROM Team;

CREATE TABLE IF NOT EXISTS Team (
    team_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    conference_id SMALLINT,
    team_name VARCHAR(50),
    team_rank VARCHAR(10),
    wins SMALLINT,
    losses SMALLINT,
    conference_wins SMALLINT,
    conference_losses SMALLINT
);

INSERT INTO Team (team_id, conference_id, team_name, team_rank, wins, losses, conference_wins, conference_losses) VALUES
(1, 1, 'Michigan State', '8', 8, 4, 5, 3),
(2, 1, 'Purdue', '3', 10, 2, 6, 1),
(3, 2, 'Duke', '5', 9, 3, 5, 2);