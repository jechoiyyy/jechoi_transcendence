CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    nickname VARCHAR(14) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    wins INT NOT NULL DEFAULT 0,
    losses INT NOT NULL DEFAULT 0,
    level INT NOT NULL DEFAULT 1,
    rating INT NOT NULL DEFAULT 1000
);

CREATE TABLE IF NOT EXISTS GameResults (
    gameId INT AUTO_INCREMENT PRIMARY KEY,
    gameMode VARCHAR(30) NOT NULL,
    total_players INT NOT NULL
    playedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    CONSTRAINT chk_total_players CHECK (total_players >= 2 AND total_players <= 4)
);

CREATE TABLE IF NOT EXISTS GameParticipants (
    gameId INT NOT NULL,
    playerId INT NOT NULL,
    finalScore INT NOT NULL DEFAULT 0,
    finalRank INT UNSIGNED NOT NULL,
    PRIMARY KEY (gameId, playerId),
    UNIQUE KEY uq_gameparticipants_game_rank (gameId, finalRank),
    KEY idx_gameparticipants_player (playerId),
    CONSTRAINT fk_gameparticipants_game
      FOREIGN KEY (gameId) REFERENCES GameResults(gameId)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT fk_gameparticipants_player
      FOREIGN KEY (playerId) REFERENCES Users(id)
      ON DELETE RESTRICT
      ON UPDATE CASCADE,
    CONSTRAINT chk_gameparticipants_finalrank CHECK (finalRank >= 1 AND finalRank <= 4)
);
