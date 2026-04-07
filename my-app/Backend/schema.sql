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
    conference_id SMALLINT FOREIGN KEY REFERENCES Conference(conference_id),
    city VARCHAR(50),
    state CHAR(2),
    founded_year SMALLINT,
 );


CREATE TABLE IF NOT EXISTS Stats (
    team_id SMALLINT AUTO_INCREMENT PRIMARY KEY FOREIGN KEY REFERENCES Team(team_id),
    team_rank VARCHAR(10),
    wins SMALLINT,
    losses SMALLINT,
    conference_wins SMALLINT,
    conference_losses SMALLINT
);

CREATE TABLE IF NOT EXISTS Coach (
    coach_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
    team_id SMALLINT FOREIGN KEY REFERENCES Team(team_id),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    hire_date DATE,
    salary VARCHAR(50)
);

INSERT INTO Conference (conference_id, conference_name, region, founded_year, num_teams) VALUES
(1, 'Big 12', 'Midwest', 1907, 10),
(2, 'ACC', 'East Coast', 1953, 15),
(3, 'SEC', 'South', 1932, 14),
(4, 'Big 10', 'Midwest', 1896, 14),
(5, 'Big East', 'West Coast', 1915, 12);

INSERT INTO Team (team_id, conference_id, team_name, school_name, city, state, founded_year) VALUES
(1, 1, 'Oklahoma', 'University of Oklahoma', 'Norman', 'OK', 1895),
(2, 1, 'Texas', 'University of Texas at Austin', 'Austin', 'TX', 1893),
(3, 2, 'Florida State', 'Florida State University', 'Tallahassee', 'FL', 1947),
(4, 2, 'Clemson', 'Clemson University', 'Clemson', 'SC', 1896),
(5, 3, 'Alabama', 'University of Alabama', 'Tuscaloosa', 'AL', 1892),
(6, 3, 'Georgia', 'University of Georgia', 'Athens', 'GA', 1892),
(7, 4, 'Ohio State', 'Ohio State University', 'Columbus', 'OH', 1890),
(8, 4, 'Michigan', 'University of Michigan', 'Ann Arbor', 'MI', 1879),
(9, 5, 'Villanova', 'Villanova University', 'Villanova', 'PA', 1842),
(10, 5, 'Marquette', 'Marquette University', 'Milwaukee', 'WI', 1881),
(11, 1, 'Kansas', 'University of Kansas', 'Lawrence', 'KS', 1890),
(12, 2, 'Miami', 'University of Miami', 'Coral Gables', 'FL', 1926),
(13, 3, 'LSU', 'Louisiana State University', 'Baton Rouge', 'LA', 1893),
(14, 4, 'Penn State', 'Pennsylvania State University', 'State College', 'PA', 1887),
(15, 5, 'Georgetown', 'Georgetown University', 'Washington D.C.', 'DC', 1789),
(16, 1, 'Iowa State', 'Iowa State University', 'Ames', 'IA', 1892),
(17, 2, 'Virginia Tech', 'Virginia Tech', 'Blacksburg', 'VA', 1872),
(18, 3, 'Florida', 'University of Florida', 'Gainesville', 'FL', 1853),
(19, 4, 'Wisconsin', 'University of Wisconsin-Madison', 'Madison', 'WI', 1848),
(20, 5, 'Providence', 'Providence College', 'Providence', 'RI', 1917),
(21, 1, 'West Virginia', 'West Virginia University', 'Morgantown', 'WV', 1867),
(22, 2, 'North Carolina', 'University of North Carolina at Chapel Hill', 'Chapel Hill', 'NC', 1789),
(23, 3, 'Auburn', 'Auburn University', 'Auburn', 'AL', 1856),
(24, 4, 'Minnesota', 'University of Minnesota', 'Minneapolis', 'MN', 1851),
(25, 5, 'Seton Hall', 'Seton Hall University', 'South Orange', 'NJ', 1856),
(26, 1, 'TCU', 'Texas Christian University', 'Fort Worth', 'TX', 1873),
(27, 2, 'Duke', 'Duke University', 'Durham', 'NC', 1838),
(28, 3, 'Mississippi State', 'Mississippi State University', 'Starkville', 'MS', 1878),
(29, 4, 'Iowa', 'University of Iowa', 'Iowa City', 'IA', 1847),
(30, 5, 'DePaul', 'DePaul University', 'Chicago', 'IL', 1898),
(31, 1, 'Baylor', 'Baylor University', 'Waco', 'TX', 1845),
(32, 2, 'North Carolina State', 'North Carolina State University', 'Raleigh', 'NC', 1887),
(33, 3, 'Ole Miss', 'University of Mississippi', 'Oxford', 'MS', 1848),
(34, 4, 'Illinois', 'University of Illinois at Urbana-Champaign', 'Champaign', 'IL', 1867),
(35, 5, 'St. John\'s', 'St. John\'s University', 'Queens', 'NY', 1870),
(36, 1, 'Oklahoma State', 'Oklahoma State University', 'Stillwater', 'OK', 1890),
(37, 2, 'Virginia', 'University of Virginia', 'Charlottesville', 'VA', 1819),
(38, 3, 'Tennessee', 'University of Tennessee', 'Knoxville', 'TN', 1794),
(39, 4, 'Northwestern', 'Northwestern University', 'Evanston', 'IL', 1851),
(40, 5, 'Butler', 'Butler University', 'Indianapolis', 'IN', 1855),
(41, 1, 'Kansas State', 'Kansas State University', 'Manhattan', 'KS', 1863),
(42, 2, 'Syracuse', 'Syracuse University', 'Syracuse', 'NY', 1870),
(43, 3, 'Missouri', 'University of Missouri', 'Columbia', 'MO', 1839),
(44, 4, 'Indiana', 'Indiana University Bloomington', 'Bloomington', 'IN', 1820),
(45, 5, 'Xavier', 'Xavier University', 'Cincinnati', 'OH', 1831),
(46, 1, 'Texas Tech', 'Texas Tech University', 'Lubbock', 'TX', 1923),
(47, 2, 'Florida State', 'Florida State University', 'Tallahassee', 'FL', 1947),
(48, 3, 'Georgia', 'University of Georgia', 'Athens', 'GA', 1892),
(49, 4, 'Michigan State', 'Michigan State University', 'East Lansing', 'MI', 1855),
(50, 5, 'Marquette', 'Marquette University', 'Milwaukee', 'WI', 1881),
(51, 1, 'Iowa State', 'Iowa State University', 'Ames', 'IA', 1892),
(52, 2, 'Virginia Tech', 'Virginia Tech', 'Blacksburg', 'VA', 1872),
(53, 3, 'Florida', 'University of Florida', 'Gainesville', 'FL', 1853),
(54, 4, 'Wisconsin', 'University of Wisconsin-Madison', 'Madison', 'WI', 1848),
(55, 5, 'Providence', 'Providence College', 'Providence', 'RI', 1917),
(56, 1, 'West Virginia', 'West Virginia University', 'Morgantown', 'WV', 1867),
(57, 2, 'North Carolina', 'University of North Carolina at Chapel Hill', 'Chapel Hill', 'NC', 1789),
(58, 3, 'Auburn', 'Auburn University', 'Auburn', 'AL', 1856),
(59, 4, 'Minnesota', 'University of Minnesota', 'Minneapolis', 'MN', 1851),
(60, 5, 'Seton Hall', 'Seton Hall University', 'South Orange', 'NJ', 1856),
(61, 1, 'TCU', 'Texas Christian University', 'Fort Worth', 'TX', 1873),
(62, 2, 'Duke', 'Duke University', 'Durham', 'NC', 1838),
(63, 3, 'Mississippi State', 'Mississippi State University', 'Starkville', 'MS', 1878),
(64, 4, 'Iowa', 'University of Iowa', 'Iowa City', 'IA', 1847),
(65, 5, 'DePaul', 'DePaul University', 'Chicago', 'IL', 1898),
(66, 1, 'Baylor', 'Baylor University', 'Waco', 'TX', 1845),
(67, 2, 'North Carolina State', 'North Carolina State University', 'Raleigh', 'NC', 1887),
(68, 3, 'Ole Miss', 'University of Mississippi', 'Oxford', 'MS', 1848),
(69, 4, 'Illinois', 'University of Illinois at Urbana-Champaign', 'Champaign', 'IL', 1867),
(70, 5, 'St. John\'s', 'St. John\'s University', 'Queens', 'NY', 1870),
(71, 1, 'Oklahoma State', 'Oklahoma State University', 'Stillwater', 'OK', 1890),
(72, 2, 'Virginia', 'University of Virginia', 'Charlottesville', 'VA', 1819),
(73, 3, 'Tennessee', 'University of Tennessee', 'Knoxville', 'TN', 1794),
(74, 4, 'Northwestern', 'Northwestern University', 'Evanston', 'IL', 1851),
(75, 5, 'Butler', 'Butler University', 'Indianapolis', 'IN', 1855),
(76, 1, 'Kansas State', 'Kansas State University', 'Manhattan', 'KS', 1863),
(77, 2, 'Syracuse', 'Syracuse University', 'Syracuse', 'NY', 1870),
(78, 3, 'Missouri', 'University of Missouri', 'Columbia', 'MO', 1839),
(79, 4, 'Indiana', 'Indiana University Bloomington', 'Bloomington', 'IN', 1820),
(80, 5, 'Xavier', 'Xavier University', 'Cincinnati', 'OH', 1831);

-- INSERT INTO Stats (team_id, team_rank, wins, losses, conference_wins, conference_losses) VALUES

-- INSERT INTO Coach (coach_id, team_id, first_name, last_name, hire_date, salary) VALUES
