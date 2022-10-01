Schema
CREATE TABLE Users(
    UserID INT PRIMARY KEY,
    Username VARCHAR(100)
);

CREATE TABLE EventGroups(
    EventGroupID INT PRIMARY KEY,
    EventGroupName VARCHAR(100),
    FKUserID INT,
    FOREIGN KEY(FKUserID) REFERENCES Users(UserID)
);

CREATE TABLE Events(
    EventID INT PRIMARY KEY,
    EventName VARCHAR(100),
    EventStartDateTime DATETIME,
    EventEndDateTime DATETIME,
    FKEventGroupID INT,
    FKUserID INT,
    FOREIGN KEY(FKEventGroupID) REFERENCES EventGroups(EventGroupID),
    FOREIGN KEY(FKUserID) REFERENCES Users(UserID)
);