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

ALTER FUNCTION "DBA"."existentItem"(IN in_itemID varchar(5))
RETURNS INTEGER
BEGIN
   DECLARE @idcount integer;
   SET @idcount = (SELECT count(itemID) from caterItems where itemID = in_itemID);
   Return @idcount;
END

ALTER FUNCTION "DBA"."existentMenu"()
RETURNS INTEGER
BEGIN
   DECLARE @menucount integer;
   SET @menucount = (SELECT count(weekItem) from caterWeekMenu);
   Return @menucount;
END

CREATE FUNCTION "DBA"."existentReceipt"()
RETURNS INTEGER
BEGIN
    DECLARE @clients integer;
    SET @clients = (SELECT count(clientName) from caterOrderSimple);
    RETURN @clients;
END

ALTER FUNCTION "DBA"."existentClient"(in in_clientName varchar(50))
returns integer
BEGIN
    declare @client int;
    set @client = (select count(clientName) from caterOrderSimple where clientName = in_clientName);
    return @client;
END