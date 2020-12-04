<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
  <body>
    <h2>My academical timetable</h2>
    <table border="1">
    <tr bgcolor="#a5abfa">
      <th align="left">Time From</th>
      <th align="left">Subject</th>
      <th align="left">Teacher</th>
    </tr>
    <xsl:for-each select="timetable/lesson">
    <tr>
      <td><xsl:value-of select="timeFrom"/></td>
      <td><xsl:value-of select="subject"/></td>
      <td><xsl:value-of select="teacher"/></td>
    </tr>
    </xsl:for-each>
    </table>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>
