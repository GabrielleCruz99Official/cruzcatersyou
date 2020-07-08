CREATE FUNCTION "DBA"."getPath"()
RETURNS TEXT
DETERMINISTIC
BEGIN
	RETURN LEFT(DB_PROPERTY('file'), (LENGTH(DB_PROPERTY('file')) - LENGTH(DB_PROPERTY('name')) - 3))
END

CREATE PROCEDURE "DBA"."http_getPage"(in page long varchar)
RESULT (html TEXT)

BEGIN
    DECLARE @html_file TEXT;
	CALL sa_set_http_header( 'Content-Type', 'text/html' );
    SET @html_file = xp_read_file(getPath() || page || '.html');
    IF @html_file IS NULL
    THEN SELECT xp_read_file(getPath() || 'index' || '.html')
    ELSE SELECT @html_file
    ENDIF;
END

CREATE PROCEDURE "DBA"."http_getCSS"( IN css TEXT )
RESULT( js TEXT )
BEGIN
	CALL sa_set_http_header( 'Content-Type', 'text/css' );
    SELECT xp_read_file(getPath() || 'css/' || css);
END

CREATE PROCEDURE "DBA"."http_getJS"( IN js TEXT )
RESULT( js TEXT )
BEGIN
	CALL sa_set_http_header( 'Content-Type', 'application/javascript' );
    SELECT xp_read_file(getPath() || 'js/' || js);
END

CREATE PROCEDURE "DBA"."http_getIMG"(in url TEXT)
BEGIN
    call sa_set_http_header('Content-Type', 'image/png');
	select xp_read_file(dba.getPath() || 'IMG/' || url);
END


