<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="/">
    <html>
      <body>
        <h2>
          <xsl:value-of select="gradeReport/date"/>
        </h2>
        <h1>
          <xsl:value-of select="gradeReport/subject"/>
        </h1>
        <h2>
          <xsl:value-of select="gradeReport/examiner"/>
        </h2>
        <table>
          <tbody>
            <tr>
              <td>Number</td>
              <td>Student</td>
              <td>Grade</td>
            </tr>
            <xsl:for-each select="gradeReport/gradeList/gradeRecord">
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
    </html>
  </xsl:template>
</xsl:stylesheet>
