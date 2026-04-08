USE Mad_Bracket;

CREATE TABLE IF NOT EXISTS Conference (
    conference_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    conference_name VARCHAR(50),
    region VARCHAR(50),
    founded_year SMALLINT,
    num_teams SMALLINT
);


CREATE TABLE IF NOT EXISTS Team (
    team_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    conference_id SMALLINT,
    team_name VARCHAR(50),
    school_name VARCHAR(50),
    city VARCHAR(50),
    state CHAR(2),
    founded_year SMALLINT,
    FOREIGN KEY (conference_id) REFERENCES Conference(conference_id)
);


CREATE TABLE IF NOT EXISTS Stats (
    team_id SMALLINT PRIMARY KEY,
    team_rank VARCHAR(10),
    wins SMALLINT,
    losses SMALLINT,
    conference_wins SMALLINT,
    conference_losses SMALLINT,
    FOREIGN KEY (team_id) REFERENCES Team(team_id)
);

CREATE TABLE IF NOT EXISTS Coach (
    coach_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    team_id SMALLINT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    hire_date DATE,
    salary VARCHAR(50),
    FOREIGN KEY (team_id) REFERENCES Team(team_id)
);

-- below is 100% accurate

INSERT INTO Conference (conference_id, conference_name, region, founded_year, num_teams) VALUES
(1, 'Big 12', 'Central/West', 1996, 16),
(2, 'ACC', 'East', 1953, 18),
(3, 'SEC', 'Southeast', 1932, 16),
(4, 'Big 10', 'Midwest/East', 1896, 18),
(5, 'Big East', 'Northeast/Midwest', 1979, 11);

-- total 79 teams

-- below is 100% accurate

INSERT INTO Team (team_id, conference_id, team_name, school_name, city, state, founded_year) VALUES
-- Big 12 (conference_id = 1, Big12)
(1, 1, 'Sun Devils', 'Arizona State', 'Tempe', 'AZ', 1885),
(2, 1, 'Utes', 'Utah', 'Salt Lake City', 'UT', 1850),
(3, 1, 'Jayhawks', 'Kansas', 'Lawrence', 'KS', 1865),
(4, 1, 'Cougars', 'BYU', 'Provo', 'UT', 1875),
(5, 1, 'Mountaineers', 'West Virginia', 'Morgantown', 'WV', 1867),
(6, 1, 'Cougars', 'Houston', 'Houston', 'TX', 1927),
(7, 1, 'Bears', 'Baylor', 'Waco', 'TX', 1845),
(8, 1, 'Buffaloes', 'Colorado', 'Boulder', 'CO', 1876),
(9, 1, 'Wildcats', 'Kansas State', 'Manhattan', 'KS', 1863),
(10, 1, 'Red Raiders', 'Texas Tech', 'Lubbock', 'TX', 1923),
(11, 1, 'Cyclones', 'Iowa State', 'Ames', 'IA', 1858),
(12, 1, 'Wildcats', 'Arizona', 'Tucson', 'AZ', 1885),
(13, 1, 'Horned Frogs', 'TCU', 'Fort Worth', 'TX', 1873),
(14, 1, 'Bearcats', 'Cincinnati', 'Cincinnati', 'OH', 1819),
(15, 1, 'Cowboys', 'Oklahoma State', 'Stillwater', 'OK', 1890),
(16, 1, 'Knights', 'UCF', 'Orlando', 'FL', 1963),

-- ACC (conference_id = 2, ACC)
(17, 2, 'Seminoles', 'Florida State', 'Tallahassee', 'FL', 1851),
(18, 2, 'Tigers', 'Clemson', 'Clemson', 'SC', 1889),
(19, 2, 'Hurricanes', 'Miami', 'Coral Gables', 'FL', 1925),
(20, 2, 'Hokies', 'Virginia Tech', 'Blacksburg', 'VA', 1872),
(21, 2, 'Tar Heels', 'North Carolina', 'Chapel Hill', 'NC', 1789),
(22, 2, 'Blue Devils', 'Duke', 'Durham', 'NC', 1838),
(23, 2, 'Wolfpack', 'NC State', 'Raleigh', 'NC', 1887),
(24, 2, 'Cavaliers', 'Virginia', 'Charlottesville', 'VA', 1819),
(25, 2, 'Orange', 'Syracuse', 'Syracuse', 'NY', 1870),
(26, 2, 'Golden Bears', 'California', 'Berkeley', 'CA', 1868),
(27, 2, 'Cardinals', 'Louisville', 'Louisville', 'KY', 1798),
(28, 2, 'Cardinal', 'Stanford', 'Stanford', 'CA', 1891),
(29, 2, 'Mustangs', 'SMU', 'Dallas', 'TX', 1911),
(30, 2, 'Fighting Irish', 'Notre Dame', 'Notre Dame', 'IN', 1842),
(31, 2, 'Demon Deacons', 'Wake Forest', 'Winston-Salem', 'NC', 1834),
(32, 2, 'Panthers', 'Pittsburgh', 'Pittsburgh', 'PA', 1787),
(33, 2, 'Eagles', 'Boston College', 'Chestnut Hill', 'MA', 1863),
(34, 2, 'Yellow Jackets', 'Georgia Tech', 'Atlanta', 'GA', 1885),



-- SEC (conference_id = 3, SEC)
(35, 3, 'Crimson Tide', 'Alabama', 'Tuscaloosa', 'AL', 1831),
(36, 3, 'Bulldogs', 'Georgia', 'Athens', 'GA', 1785),
(37, 3, 'Tigers', 'LSU', 'Baton Rouge', 'LA', 1860),
(38, 3, 'Gators', 'Florida', 'Gainesville', 'FL', 1853),
(39, 3, 'Tigers', 'Auburn', 'Auburn', 'AL', 1856),
(40, 3, 'Bulldogs', 'Mississippi State', 'Starkville', 'MS', 1878),
(41, 3, 'Rebels', 'Ole Miss', 'Oxford', 'MS', 1848),
(42, 3, 'Volunteers', 'Tennessee', 'Knoxville', 'TN', 1794),
(43, 3, 'Tigers', 'Missouri', 'Columbia', 'MO', 1839),
(44, 3, 'Sooners', 'Oklahoma', 'Norman', 'OK', 1890),
(45, 3, 'Razorbacks', 'Arkansas', 'Fayetteville', 'AR', 1871),
(46, 3, 'Commodores', 'Vanderbilt', 'Nashville', 'TN', 1873),
(47, 3, 'Longhorns', 'Texas', 'Austin', 'TX', 1883),
(48, 3, 'Gamecocks', 'South Carolina', 'Columbia', 'SC', 1801),
(49, 3, 'Aggies', 'Texas A&M', 'College Station', 'TX', 1876),
(50, 3, 'Wildcats', 'Kentucky', 'Lexington', 'KY', 1865),

-- Big 10 (conference_id = 4, Big10)
(51, 4, 'Buckeyes', 'Ohio State', 'Columbus', 'OH', 1870),
(52, 4, 'Wolverines', 'Michigan', 'Ann Arbor', 'MI', 1817),
(53, 4, 'Nittany Lions', 'Penn State', 'State College', 'PA', 1855),
(54, 4, 'Badgers', 'Wisconsin', 'Madison', 'WI', 1848),
(55, 4, 'Golden Gophers', 'Minnesota', 'Minneapolis', 'MN', 1851),
(56, 4, 'Hawkeyes', 'Iowa', 'Iowa City', 'IA', 1847),
(57, 4, 'Fighting Illini', 'Illinois', 'Champaign', 'IL', 1867),
(58, 4, 'Ducks', 'Oregon', 'Eugene', 'OR', 1876),
(59, 4, 'Cornhuskers', 'Nebraska', 'Lincoln', 'NE', 1869),
(60, 4, 'Spartans', 'Michigan State', 'East Lansing', 'MI', 1855),
(61, 4, 'Bruins', 'UCLA', 'Los Angeles', 'CA', 1919),
(62, 4, 'Boilermakers', 'Purdue', 'West Lafayette', 'IN', 1869),
(63, 4, 'Trojans', 'USC', 'Los Angeles', 'CA', 1880),
(64, 4, 'Scarlet Knights', 'Rutgers', 'New Brunswick', 'NJ', 1766),
(65, 4, 'Huskies', 'Washington', 'Seattle', 'WA', 1861),
(66, 4, 'Hoosiers', 'Indiana', 'Bloomington', 'IN', 1820),
(67, 4, 'Wildcats', 'Northwestern', 'Evanston', 'IL', 1851),
(68, 4, 'Terrapins', 'Maryland', 'College Park', 'MD', 1856),

-- Big East (conference_id = 5, BigEast)
(69, 5, 'Wildcats', 'Villanova', 'Villanova', 'PA', 1842),
(70, 5, 'Hoyas', 'Georgetown', 'Washington D.C.', 'DC', 1789),
(71, 5, 'Friars', 'Providence', 'Providence', 'RI', 1917),
(72, 5, 'Bluejays', 'Creighton', 'Omaha', 'NE', 1878),
(73, 5, 'Blue Demons', 'DePaul', 'Chicago', 'IL', 1898),
(74, 5, 'Golden Eagles', 'Marquette', 'Milwaukee', 'WI', 1881),
(75, 5, 'Huskies', 'UConn', 'Storrs', 'CT', 1881),
(76, 5, 'Pirates', 'Seton Hall', 'South Orange', 'NJ', 1856),
(77, 5, 'Red Storm', 'St. Johns', 'Queens', 'NY', 1870),
(78, 5, 'Bulldogs', 'Butler', 'Indianapolis', 'IN', 1855),
(79, 5, 'Musketeers', 'Xavier', 'Cincinnati', 'OH', 1831);

-- below is 100% accurate

INSERT INTO Stats (team_id, team_rank, wins, losses, conference_wins, conference_losses) VALUES
(1, 'NR', 17, 16, 7, 11), -- Arizona State
(2, 'NR', 10, 22, 2, 16), -- Utah
(3, '17', 24, 11, 12, 6), -- Kansas
(4, 'NR', 23, 12, 12, 3), -- BYU
(5, 'NR', 21, 14, 9, 9), -- West Virginia
(6, '5', 30, 7, 14, 4), -- Houston
(7, 'NR', 17, 17, 6, 12), -- Baylor
(8, 'NR', 17, 16, 7, 11), -- Colorado
(9, 'NR', 12, 20, 3, 15), -- Kansas State
(10, '20', 23, 11, 12, 6), -- Texas Tech
(11, '6', 29, 8, 12, 6), -- Iowa State
(12, '2', 36, 3, 16, 2), -- Arizona
(13, 'NR',23, 12, 11, 7), -- TCU
(14, 'NR', 18, 15, 9, 9), -- Cincinnati
(15, 'NR', 20, 15, 6, 12), -- Oklahoma State
(16, 'NR', 21, 12, 9, 9), -- UCF
(17, 'NR', 18, 15, 10, 8), -- Florida State
(18, 'NR', 24, 11, 12, 6), -- Clemson
(19, '25', 26, 9, 13, 5), -- Miami
(20, 'NR', 19, 12, 8, 10), -- Virginia Tech
(21, '21', 24, 9, 12, 6), -- North Carolina
(22, '1', 35,3 , 17, 1), -- Duke
(23, 'NR', 20, 14, 10 , 8), -- NC State
(24, '9', 30, 6, 15, 3), -- Virginia
(25, 'NR', 15, 17, 6, 12), -- Syracuse
(26, 'NR', 22, 12, 9, 9), -- California
(27, '23', 24, 11, 11, 7), -- Louisville
(28, 'NR', 20, 13, 9, 9), -- Stanford
(29, 'NR', 20, 14, 8, 10), -- SMU
(30, 'NR', 13, 18, 4, 14), -- Notre Dame
(31, 'NR', 18, 17, 7, 11), -- Wake Forest
(32, 'NR', 13, 20, 5, 13), -- Pittsburgh
(33, 'NR', 11, 20, 4, 14), -- Boston College
(34, 'NR', 11, 20, 2, 16), -- Georgia Tech
(35, '18', 25, 10, 13, 5), -- Alabama
(36, 'NR', 22, 11, 10, 8), -- Georgia
(37, 'NR', 15, 17, 3, 15), -- LSU
(38, '4', 27, 8, 16, 2), -- Florida
(39, 'NR', 22, 16, 7, 11), -- Auburn
(40, 'NR', 13, 19, 5, 13), -- Mississippi State
(41, 'NR', 15, 20, 4, 14), -- Ole Miss
(42, '24', 25, 12, 11, 7), -- Tennessee
(43, 'NR', 20, 13, 10, 8), -- Missouri
(44, 'NR', 21, 16, 7, 11), -- Oklahoma
(45, '14', 28, 9, 13, 5), -- Arkansas
(46, '16', 27, 9, 11, 7), -- Vanderbilt
(47, 'NR', 21, 15, 9, 9), -- Texas
(48, 'NR', 13, 19, 4, 14), -- South Carolina
(49, 'NR', 22, 12, 11, 7), -- Texas A&M
(50, 'NR', 22, 14, 10, 8), -- Kentucky
(51, 'NR', 21, 13, 12, 8), -- Ohio State
(52, '3', 37, 3, 19, 1), -- Michigan
(53, 'NR', 12, 20, 3, 17), -- Penn State
(54, '19', 24, 11, 14, 6), -- Wisconsin
(55, 'NR', 15, 18, 8, 12), -- Minnesota
(56, 'NR', 24, 13, 10, 10), -- Iowa
(57, '13', 28, 9, 15, 5), -- Illinois
(58, 'NR', 12, 20, 5, 15), -- Oregon
(59, '15', 28, 7, 15, 5), -- Nebraska
(60, '11', 27, 8, 15, 5), -- Michigan State
(61, 'NR', 24, 12, 13, 7), -- UCLA
(62, '8', 30, 9, 13, 7), -- Purdue
(63, 'NR', 18, 14, 7, 13), -- USC
(64, 'NR', 14, 20, 6, 14), -- Rutgers
(65, 'NR', 16, 17, 7, 13), -- Washington
(66, 'NR', 18, 14, 9, 11), -- Indiana
(67, 'NR', 15, 19, 5, 15), -- Northwestern
(68, 'NR', 12, 21, 4, 16), -- Maryland
(69, 'NR', 24, 9, 15, 5), -- Villanova
(70, 'NR', 16, 18, 6, 14), -- Georgetown
(71, 'NR', 15, 18, 7, 13), -- Providence
(72, 'NR', 16, 18, 9, 11), -- Creighton
(73, 'NR', 16, 16, 8, 12), -- DePaul
(74, 'NR', 12, 20, 7, 13), -- Marquette
(75, '7', 34, 6, 17, 3), -- UConn
(76, 'NR', 21, 12, 10, 10), -- Seton Hall
(77, '10', 30, 7, 18, 2), -- St. Johns
(78, 'NR',  16, 16, 7, 13), -- Butler
(79, 'NR', 16, 18, 6, 14); -- Xavier

-- below is 100% accurate

INSERT INTO Coach (team_id, first_name, last_name, hire_date, salary) VALUES

-- Big 12 (conference_id = 1)
-- team_id 1: Arizona State - Randy Bennett (just hired March 2026, was Bobby Hurley during season)
(1, 'Randy', 'Bennett', '2026-03-23', '$3,500,000'),

-- team_id 2: Utah
(2, 'Alex', 'Jensen', '2025-04-10', '$2,500,000'),

-- team_id 3: Kansas
(3, 'Bill', 'Self', '2003-04-21', '$8,800,000'),

-- team_id 4: BYU
(4, 'Kevin', 'Young', '2024-03-28', '$3,000,000'),

-- team_id 5: West Virginia
(5, 'Ross', 'Hodge', '2025-04-05', '$2,000,000'),

-- team_id 6: Houston
(6, 'Kelvin', 'Sampson', '2014-04-01', '$5,500,000'),

-- team_id 7: Baylor
(7, 'Scott', 'Drew', '2003-08-26', '$5,200,000'),

-- team_id 8: Colorado
(8, 'Tad', 'Boyle', '2010-04-02', '$3,000,000'),

-- team_id 9: Kansas State (Matthew Driscoll was interim after Tang firing Feb 2026)
(9, 'Matthew', 'Driscoll', '2026-02-15', '$800,000'),

-- team_id 10: Texas Tech
(10, 'Grant', 'McCasland', '2023-04-03', '$5,000,000'),

-- team_id 11: Iowa State
(11, 'T.J.', 'Otzelberger', '2021-04-13', '$4,000,000'),

-- team_id 12: Arizona
(12, 'Tommy', 'Lloyd', '2021-04-06', '$5,000,000'),

-- team_id 13: TCU
(13, 'Jamie', 'Dixon', '2016-03-29', '$3,500,000'),

-- team_id 14: Cincinnati
(14, 'Wes', 'Miller', '2022-04-04', '$3,000,000'),

-- team_id 15: Oklahoma State
(15, 'Steve', 'Lutz', '2024-04-01', '$2,500,000'),

-- team_id 16: UCF
(16, 'Johnny', 'Dawkins', '2023-03-27', '$2,500,000'),

-- ACC (conference_id = 2)
-- team_id 17: Florida State
(17, 'Luke', 'Loucks', '2025-04-01', '$2,000,000'),

-- team_id 18: Clemson
(18, 'Brad', 'Brownell', '2010-04-02', '$3,500,000'),

-- team_id 19: Miami
(19, 'Jai', 'Lucas', '2025-04-01', '$2,500,000'),

-- team_id 20: Virginia Tech
(20, 'Mike', 'Young', '2019-04-01', '$2,500,000'),

-- team_id 21: North Carolina
(21, 'Hubert', 'Davis', '2021-04-06', '$3,800,000'),

-- team_id 22: Duke
(22, 'Jon', 'Scheyer', '2022-06-03', '$7,350,000'),

-- team_id 23: NC State
(23, 'Will', 'Wade', '2025-04-01', '$3,000,000'),

-- team_id 24: Virginia
(24, 'Ryan', 'Odom', '2025-04-01', '$2,500,000'),

-- team_id 25: Syracuse
(25, 'Adrian', 'Autry', '2023-03-29', '$2,500,000'),

-- team_id 26: California
(26, 'Mark', 'Madsen', '2024-04-01', '$2,000,000'),

-- team_id 27: Louisville
(27, 'Pat', 'Kelsey', '2023-04-01', '$3,500,000'),

-- team_id 28: Stanford
(28, 'Kyle', 'Smith', '2024-04-01', '$2,000,000'),

-- team_id 29: SMU
(29, 'Andy', 'Enfield', '2024-04-01', '$3,000,000'),

-- team_id 30: Notre Dame
(30, 'Micah', 'Shrewsberry', '2024-04-01', '$3,000,000'),

-- team_id 31: Wake Forest
(31, 'Steve', 'Forbes', '2020-04-01', '$2,500,000'),

-- team_id 32: Pittsburgh
(32, 'Jeff', 'Capel', '2018-03-15', '$2,800,000'),

-- team_id 33: Boston College
(33, 'Earl', 'Grant', '2021-04-01', '$2,000,000'),

-- team_id 34: Georgia Tech
(34, 'Damon', 'Stoudamire', '2023-04-01', '$2,500,000'),

-- SEC (conference_id = 3)
-- team_id 35: Alabama
(35, 'Nate', 'Oats', '2019-04-01', '$5,500,000'),

-- team_id 36: Georgia
(36, 'Mike', 'White', '2021-04-01', '$2,800,000'),

-- team_id 37: LSU
(37, 'Matt', 'McMahon', '2022-04-01', '$3,000,000'),

-- team_id 38: Florida
(38, 'Todd', 'Golden', '2022-04-01', '$6,000,000'),

-- team_id 39: Auburn
(39, 'Steven', 'Pearl', '2025-04-01', '$3,500,000'),

-- team_id 40: Mississippi State
(40, 'Bucky', 'McMillan', '2025-04-01', '$2,500,000'),

-- team_id 41: Ole Miss
(41, 'Chris', 'Beard', '2023-04-01', '$4,000,000'),

-- team_id 42: Tennessee
(42, 'Rick', 'Barnes', '2015-04-01', '$6,000,000'),

-- team_id 43: Missouri
(43, 'Dennis', 'Gates', '2022-04-01', '$3,000,000'),

-- team_id 44: Oklahoma
(44, 'Porter', 'Moser', '2021-04-01', '$3,500,000'),

-- team_id 45: Arkansas
(45, 'John', 'Calipari', '2024-04-01', '$8,000,000'),

-- team_id 46: Vanderbilt
(46, 'Mark', 'Byington', '2024-04-01', '$2,500,000'),

-- team_id 47: Texas
(47, 'Sean', 'Miller', '2025-04-01', '$4,800,000'),

-- team_id 48: South Carolina
(48, 'Lamont', 'Paris', '2022-04-01', '$2,500,000'),

-- team_id 49: Texas A&M
(49, 'Buzz', 'Williams', '2019-04-01', '$4,800,000'),

-- team_id 50: Kentucky
(50, 'Mark', 'Pope', '2024-04-01', '$5,500,000'),

-- Big Ten (conference_id = 4)
-- team_id 51: Ohio State
(51, 'Jake', 'Diebler', '2024-03-15', '$3,500,000'),

-- team_id 52: Michigan
(52, 'Dusty', 'May', '2024-03-25', '$5,000,000'),

-- team_id 53: Penn State
(53, 'Mike', 'Rhoades', '2023-04-01', '$3,000,000'),

-- team_id 54: Wisconsin
(54, 'Greg', 'Gard', '2015-12-15', '$3,550,000'),

-- team_id 55: Minnesota
(55, 'Niko', 'Medved', '2025-04-01', '$2,500,000'),

-- team_id 56: Iowa
(56, 'Ben', 'McCollum', '2025-04-01', '$3,500,000'),

-- team_id 57: Illinois
(57, 'Brad', 'Underwood', '2017-03-20', '$5,000,000'),

-- team_id 58: Oregon
(58, 'Dana', 'Altman', '2010-04-02', '$4,500,000'),

-- team_id 59: Nebraska
(59, 'Fred', 'Hoiberg', '2019-04-01', '$4,500,000'),

-- team_id 60: Michigan State
(60, 'Tom', 'Izzo', '1995-07-01', '$6,200,000'),

-- team_id 61: UCLA
(61, 'Mick', 'Cronin', '2019-04-01', '$6,100,000'),

-- team_id 62: Purdue
(62, 'Matt', 'Painter', '2005-04-01', '$4,000,000'),

-- team_id 63: USC
(63, 'Eric', 'Musselman', '2024-04-01', '$4,000,000'),

-- team_id 64: Rutgers
(64, 'Steve', 'Pikiell', '2016-04-01', '$4,000,000'),

-- team_id 65: Washington
(65, 'Danny', 'Sprinkle', '2024-04-01', '$3,000,000'),

-- team_id 66: Indiana
(66, 'Darian', 'DeVries', '2025-04-01', '$4,000,000'),

-- team_id 67: Northwestern
(67, 'Brian', 'Carmody', '2024-04-01', '$2,500,000'),

-- team_id 68: Maryland
(68, 'Buzz', 'Williams', '2025-04-01', '$4,800,000'),

-- Big East (conference_id = 5)
-- team_id 69: Villanova
(69, 'Kevin', 'Willard', '2025-04-01', '$4,000,000'),

-- team_id 70: Georgetown
(70, 'Ed', 'Cooley', '2023-04-01', '$3,000,000'),

-- team_id 71: Providence
(71, 'Kim', 'English', '2023-04-01', '$2,000,000'),

-- team_id 72: Creighton
(72, 'Greg', 'McDermott', '2010-04-01', '$3,500,000'),

-- team_id 73: DePaul
(73, 'Chris', 'Holtmann', '2024-04-01', '$3,000,000'),

-- team_id 74: Marquette
(74, 'Shaka', 'Smart', '2021-04-01', '$3,500,000'),

-- team_id 75: UConn
(75, 'Dan', 'Hurley', '2018-04-01', '$7,780,000'),

-- team_id 76: Seton Hall
(76, 'Shaheen', 'Holloway', '2022-04-01', '$2,500,000'),

-- team_id 77: St. John's
(77, 'Rick', 'Pitino', '2023-04-01', '$4,000,000'),

-- team_id 78: Butler
(78, 'Thad', 'Matta', '2023-04-01', '$2,000,000'),

-- team_id 79: Xavier
(79, 'Richard', 'Pitino', '2025-04-01', '$2,500,000');