# Creating str split function 
	CREATE FUNCTION strSplit(x varchar(255), delim varchar(12), pos int) returns varchar(255)
	return replace(substring(substring_index(x, delim, pos), length(substring_index(x, delim, pos - 1)) + 1), delim, '');

# bus stop that appears on the most bus routes.
		#SELECT LENGTH('foobarfoobarfoobar') - LENGTH(REPLACE('foobarfoobarfoobar', 'b', '')) AS `occurrences`
	# returns the intersection with the max number of routes that pass by it 
	SELECT stop_id, on_street, cross_street, MAX(number_of_routes) as number_of_routes FROM 
	(SELECT stop_id, on_street, cross_street, (LENGTH(routes) - LENGTH(REPLACE(routes, ',', '')) + 1) AS 'number_of_routes' FROM ridership ORDER BY number_of_routes DESC) AS Testing
	
	# returns intersections and count of routes that pass by it 
	SELECT stop_id, on_street, cross_street, (LENGTH(routes) - LENGTH(REPLACE(routes, ',', '')) + 1) AS 'number_of_routes' FROM ridership ORDER BY number_of_routes DESC


	# With location
	SELECT stop_id, on_street, cross_street, location, (LENGTH(routes) - LENGTH(REPLACE(routes, ',', '')) + 1) AS 'number_of_routes' FROM ridership ORDER BY number_of_routes DESC


# Longest bus route (by number of stops)

	#CREATE FUNCTION strSplit(x varchar(255), delim varchar(12), pos int) returns varchar(255)
	#return replace(substring(substring_index(x, delim, pos), length(substring_index(x, delim, pos - 1)) + 1), delim, '');

	#returns a list of values with max bus stop values 
	SELECT count(stop_id) AS number_of_stops, first as route_number FROM 
	( 
	SELECT strSplit(routes, ',', 1) as first, stop_id FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 2) as second, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 3) as third, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 4) as fourth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 5) as fifth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 6) as sixth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 7) as seventh, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 8) as eight, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 9) as nineth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 10) as tenth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 11) as eleventh, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 12) as twelfth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 13) as thirteenth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 14) as fourteenth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 15) as fifteenth, stop_id  FROM ridership
	ORDER BY first) AS rider_union WHERE first <> "" GROUP BY first ORDER BY number_of_stops DESC



	# Returns 1 row with the max bus stop value 
	SELECT MAX(number_of_stops) as stops, route_number FROM 
	(
	SELECT count(stop_id) AS number_of_stops, first as route_number FROM 
	( 
	SELECT strSplit(routes, ',', 1) as first, stop_id FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 2) as second, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 3) as third, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 4) as fourth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 5) as fifth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 6) as sixth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 7) as seventh, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 8) as eight, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 9) as nineth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 10) as tenth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 11) as eleventh, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 12) as twelfth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 13) as thirteenth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 14) as fourteenth, stop_id  FROM ridership
	UNION ALL 
	SELECT strSplit(routes, ',', 15) as fifteenth, stop_id  FROM ridership
	ORDER BY first) AS rider_union WHERE first <> "" GROUP BY first ORDER BY number_of_stops DESC) AS testing


	#CREATE FUNCTION strSplit(x varchar(255), delim varchar(12), pos int) returns varchar(255)
	#return replace(substring(substring_index(x, delim, pos), length(substring_index(x, delim, pos - 1)) + 1), delim, '');

	SELECT COUNT(routes) FROM ridership where routes = 9




# excess

SELECT * FROM (SELECT stop_id, on_street, cross_street, (LENGTH(routes) - LENGTH(REPLACE(routes, ',', '')) + 1) AS number_of_routes FROM ridership ORDER BY number_of_routes DESC) AS apple WHERE number_of_routes > 2 
 