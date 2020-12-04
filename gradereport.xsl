<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/">
    <html>
      <body>
        <body>
          <h2>
            <xsl:value-of select="date"/>
          </h2>
          <h1>
            <xsl:value-of select="subject"/>
          </h1>
          <h2>
            <xsl:value-of select="examiner"/>
          </h2>
          <table>
            <tbody>
              <tr>
                <td>Number</td>
                <td>Student</td>
                <td>Grade</td>
              </tr>
              <xsl:for-each select="timetable/lesson">
                <tr>
                  <td>
                    <xsl:value-of select="id"/>
                  </td>
                  <td>
                    <xsl:value-of select="student"/>
                  </td>
                  <td>
                    <xsl:value-of select="grade"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </body>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
