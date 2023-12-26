<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:array="http://www.w3.org/2005/xpath-functions/array"
                xmlns:exslt="http://exslt.org/common"
                exclude-result-prefixes="#all"
                expand-text="yes"
                version="1.1">

<xsl:template match="entity">
    <html>
        <head>
            <title>
                <xsl:apply-templates select="./identSection/nameCode"/>
                <xsl:value-of select="' - '"/>
                <xsl:value-of select="./identSection/entityName"/>
            </title>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        </head>
        <body>
            <xsl:variable name="dm_to_parse" >
                <xsl:apply-templates select="*" mode="import"/>
            </xsl:variable>
            <xsl:apply-templates select="exslt:node-set($dm_to_parse)"/>
        </body>
    </html>
</xsl:template>

<xsl:template match="*" mode="import">
    <xsl:choose>
        <xsl:when test="name(.) = 'dmRef' and @type = 'import'">
            <xsl:variable name="dm_name">
                <xsl:apply-templates select="./nameCode"/>
            </xsl:variable>
            <xsl:variable name="dm_file" select="concat($dm_name, '.XML')"/>
            <title><xsl:value-of select="exslt:node-set(document($dm_file))//entityName[1]"/></title>
            <xsl:copy-of select="exslt:node-set(document($dm_file))//section[1]"/>
        </xsl:when>
        <xsl:otherwise>
            <xsl:copy>
                <xsl:apply-templates select="./* | text() | @*" mode="import"/>
            </xsl:copy>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>

<xsl:template match="@*" mode="import">
    <xsl:copy-of select="."/>
</xsl:template>


<xsl:template match="text()" mode="import">
    <xsl:value-of select="."/>
</xsl:template>

<xsl:template match="identSection">
    <div id="{name(.)}">
        <xsl:apply-templates select="./entityName" mode="header"/>
        <xsl:apply-templates select="./nameCode" mode="header"/>
    </div>
</xsl:template>

<xsl:template match="entityName" mode="header">
        <h1><xsl:value-of select="."/></h1>
</xsl:template>

<xsl:template match="nameCode" mode="header">
    <p>
        <xsl:value-of select="'Code : '"/>
        <xsl:apply-templates select="."/>
    </p>
</xsl:template>


<xsl:template match="nameCode">
    <xsl:value-of select="@projectCode"/>
    <xsl:value-of select="'-'"/>
    <xsl:value-of select="@chapterCode"/>
    <xsl:value-of select="@sectionCode"/>
    <xsl:value-of select="'-'"/>
    <xsl:value-of select="@typeCode"/>
    <xsl:value-of select="'-'"/>
    <xsl:value-of select="@identCode"/>
</xsl:template>

<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->

<xsl:template match="section">
    <div>
        <xsl:copy-of select="@id"/>
        <xsl:apply-templates select="./*"/>
    </div>
</xsl:template>

<xsl:template match="title">
    <xsl:variable name="level" as="xs:integer" select="count(ancestor::*[name() = 'section'])"/>
    <xsl:choose>
        <xsl:when test="$level = 1">
            <h2><xsl:value-of select="."/></h2>
        </xsl:when>
        <xsl:when test="$level = 2">
            <h3><xsl:value-of select="."/></h3>
        </xsl:when>
        <xsl:when test="$level = 3">
            <h4><xsl:value-of select="."/></h4>
        </xsl:when>
        <xsl:when test="$level = 1">
            <h5><xsl:value-of select="."/></h5>
        </xsl:when>
        <xsl:otherwise>
            <h6><xsl:value-of select="."/></h6>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>

<xsl:template match="para">
    <p>
        <xsl:apply-templates select="./* | ./text()"/>
    </p>
</xsl:template>

<xsl:template match="unit">
    <span class="{@name}">
        <xsl:apply-templates select="./*"/>

        <xsl:if test="not(@hidden) or @hidden = false()">
            <xsl:value-of select="concat(' ', @name)"/>
        </xsl:if>
    </span>
</xsl:template>

<xsl:template match="list">
    <xsl:choose>
        <xsl:when test="@numerical = true()">
            <ol>
                <xsl:copy-of select="@id"/>
                <xsl:apply-templates select="./*"/>
            </ol>
        </xsl:when>
        <xsl:otherwise>
            <ul>
                <xsl:copy-of select="@id"/>
                <xsl:apply-templates select="./*"/>
            </ul>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>

<xsl:template match="listElem">
    <li>
        <xsl:copy-of select="@id"/>
        <xsl:apply-templates select="./*"/>
    </li>
</xsl:template>


<xsl:template match="dict">
    <table>
        <xsl:apply-templates select="./*"/>
    </table>
</xsl:template>

<xsl:template match="dictElem">
    <tr>
        <xsl:apply-templates select="./*"/>
    </tr>
</xsl:template>

<xsl:template match="dictKey">
    <td class="dictKey">
        <xsl:value-of select="."/>
        <xsl:value-of select="' :'"/>
    </td>
</xsl:template>

<xsl:template match="dictValue">
    <td class="dictValue">
        <xsl:apply-templates select="./*"/>
    </td>
</xsl:template>


<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->



<xsl:template match="status">
    <span id="{@name}" value="{@value}">
        <strong><xsl:value-of select="@name"/></strong>
        <xsl:value-of select="'---'"/>
        <xsl:choose>
            <xsl:when test="@value = 'true'">
                <xsl:value-of select="'&#x2714;'"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="'&#x2716;'"/>
            </xsl:otherwise>
        </xsl:choose>
    </span>
</xsl:template>


<xsl:template match="stat">
    <span class="stat">
        <span class="statName"><xsl:value-of select="@nameId"/></span>
        <xsl:value-of select="' : '"/>
        <span class="statValue"><xsl:value-of select="@value"/></span>
    </span>
</xsl:template>


<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->

<xsl:template match="under">
    <span class="underline">
        <xsl:apply-templates select="./*"/>
    </span>
</xsl:template>


<xsl:template match="ita">
    <em>
        <xsl:apply-templates select="./* | text()"/>
    </em>
</xsl:template>

<xsl:template match="bold">
    <strong>
        <xsl:apply-templates select="./* | text()"/>
    </strong>
</xsl:template>

<xsl:template match="accronymTerm">
    <xsl:variable name="term" as="xs:string" select="./text()"/>
    <abbr title="{//accronym[descendant::accronymTerm = $term]/accronymDefinition}">
        <xsl:value-of select="."/>
    </abbr>
</xsl:template>

<xsl:template match="accronymDefinition">
</xsl:template>

<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->


<xsl:template match="sumUnit">
</xsl:template>

<xsl:template match="number">
    <xsl:value-of select="./@value"/>
</xsl:template>

<xsl:template name="are_all_statRef_binded">
    <xsl:for-each select=".//statRef">
        <xsl:variable name="refName" select="./@ref"/>
        <xsl:choose>
            <xsl:when test="//stat[@nameId = $refName]">
                <xsl:value-of select="1"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="0"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:for-each>
</xsl:template>

<xsl:template match="calculation">
    <xsl:variable name="are_all_statRef_binded">
        <xsl:call-template name="are_all_statRef_binded"/>
    </xsl:variable>

    <xsl:variable name="explicit" as="xs:string">
        <xsl:apply-templates select="./*" mode="explicit"/>
    </xsl:variable>


    <xsl:choose>
        <xsl:when test="not(.//statRef) or not(contains($are_all_statRef_binded, 0))">
                <xsl:variable name="result">
                    <xsl:apply-templates select="./*" mode="calculation"/>
                </xsl:variable>
                <xsl:variable name="result_value" as="xs:integer" select="exslt:node-set($result)//@value"/>

            <abbr title="{$explicit}">
                <xsl:choose>
                    <xsl:when test="@isScore = 'true'">
                        <xsl:call-template name="applyChanceTable">
                            <xsl:with-param name="score" as="xs:integer" select="$result_value"/>
                        </xsl:call-template>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:value-of select="$result_value"/>
                    </xsl:otherwise>
                </xsl:choose>
            </abbr>
        </xsl:when>
        <xsl:otherwise>
            <xsl:value-of select="$explicit"/>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>

<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->



<xsl:template match="statRef" mode="explicit">
    <strong><xsl:value-of select="./@ref"/></strong>
</xsl:template>

<xsl:template match="number" mode="explicit">
    <xsl:value-of select="./@value"/>
</xsl:template>

<xsl:template match="add" mode="explicit">
    <xsl:value-of select="'('"/>
    <xsl:for-each select="./*">
        <xsl:apply-templates select="." mode="explicit"/>
        <xsl:if test="position() != last()">
            <xsl:value-of select="' + '"/>
        </xsl:if>
    </xsl:for-each>
    <xsl:value-of select="')'"/>
</xsl:template>

<xsl:template match="sub" mode="explicit">
    <xsl:value-of select="'('"/>
    <xsl:for-each select="./*">
        <xsl:apply-templates select="." mode="explicit"/>
        <xsl:if test="position() != last()">
            <xsl:value-of select="' - '"/>
        </xsl:if>
    </xsl:for-each>
    <xsl:value-of select="')'"/>
</xsl:template>

<xsl:template match="mul" mode="explicit">
    <xsl:for-each select="./*">
        <xsl:apply-templates select="." mode="explicit"/>
        <xsl:if test="position() != last()">
            <xsl:value-of select="' x '"/>
        </xsl:if>
    </xsl:for-each>
</xsl:template>

<xsl:template match="div" mode="explicit">
    <xsl:for-each select="./*">
        <xsl:apply-templates select="." mode="explicit"/>
        <xsl:if test="position() != last()">
            <xsl:value-of select="' / '"/>
        </xsl:if>
    </xsl:for-each>
</xsl:template>



<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->
<!-- ############################################################################################# -->



<xsl:template match="statRef" mode="calculation">
    <number value="{//stat[@nameId = current()/@ref]/@value}"/>
</xsl:template>

<xsl:template match="number" mode="calculation">
    <xsl:copy-of select="."/>
</xsl:template>

<xsl:template match="add" mode="calculation">
    <xsl:variable name="result">
        <xsl:apply-templates select="./*" mode="calculation"/>
    </xsl:variable>
    <number value="{sum(exslt:node-set($result)//@value)}"/>
</xsl:template>

<xsl:template match="sub" mode="calculation">
    <xsl:variable name="result">
        <xsl:apply-templates select="./*" mode="calculation"/>
    </xsl:variable>
    <number value="{exslt:node-set($result)/*[1]/@value - sum(exslt:node-set($result)/*[position() &gt; 1]/@value)}"/>
</xsl:template>

<xsl:template match="mul" mode="calculation">
    <xsl:variable name="result">
        <xsl:apply-templates select="./*" mode="calculation"/>
    </xsl:variable>
    <xsl:variable name="result_multiplication">
        <xsl:call-template name="multiply">
            <xsl:with-param name="elements" select="exslt:node-set($result)/*"/>
        </xsl:call-template>
    </xsl:variable>
    <number value="{$result_multiplication}"/>
</xsl:template>

<xsl:template match="div" mode="calculation">
    <xsl:variable name="result">
        <xsl:apply-templates select="./*" mode="calculation"/>
    </xsl:variable>
    <xsl:variable name="result_multiplication">
        <xsl:call-template name="divide">
            <xsl:with-param name="elements" select="exslt:node-set($result)/*"/>
        </xsl:call-template>
    </xsl:variable>
    <number value="{floor($result_multiplication)}"/>
</xsl:template>

<xsl:template name="multiply">
    <xsl:param name="elements"/>
    <xsl:param name="current" select="1"/>

    <xsl:variable name="elements_node" select="exslt:node-set($elements)"/>
    <xsl:choose>
      <xsl:when test="not($elements_node)">
        <xsl:value-of select="$current"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="multiply">
          <xsl:with-param name="elements" select="$elements_node[position() &lt; last()]"/>
          <xsl:with-param name="current" select="$current * $elements_node[last()]/@value"/>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
</xsl:template>

<xsl:template name="divide">
    <xsl:param name="elements"/>
    <xsl:param name="current" select="1"/>

    <xsl:variable name="elements_node" select="exslt:node-set($elements)"/>
    <xsl:choose>
      <xsl:when test="not($elements_node)">
        <xsl:value-of select="$current"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="multiply">
          <xsl:with-param name="elements" select="$elements_node[position() &lt; last()]"/>
          <xsl:with-param name="current" select="$current div $elements_node[last()]/@value"/>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>
</xsl:template>


<xsl:template name="applyChanceTable">
    <xsl:param name="score" as="xs:integer" select="0"/>

    <xsl:choose>
        <xsl:when test="$score = 0">
            <xsl:value-of select="0"/>
        </xsl:when>
        <xsl:when test="$score = 1">
            <xsl:value-of select="6"/>
        </xsl:when>
        <xsl:when test="$score = 2">
            <xsl:value-of select="18"/>
        </xsl:when>
        <xsl:when test="$score = 3">
            <xsl:value-of select="28"/>
        </xsl:when>
        <xsl:when test="$score = 4">
            <xsl:value-of select="34"/>
        </xsl:when>
        <xsl:when test="$score = 5">
            <xsl:value-of select="40"/>
        </xsl:when>
        <xsl:when test="$score = 6">
            <xsl:value-of select="45"/>
        </xsl:when>
        <xsl:when test="$score = 7">
            <xsl:value-of select="50"/>
        </xsl:when>
        <xsl:when test="$score = 8">
            <xsl:value-of select="53"/>
        </xsl:when>
        <xsl:when test="$score &gt;=  9 and $score &lt;= 15">
            <xsl:value-of select="55 + ($score - 9) * 2"/>
        </xsl:when>
        <xsl:when test="$score &gt;=  16 and $score &lt;= 36">
            <xsl:value-of select="68 + ($score - 16)"/>
        </xsl:when>
        <xsl:when test="$score &gt;= 37 and $score &lt;= 48">
            <xsl:value-of select="89 + floor(($score - 37) div 2)"/>
        </xsl:when>
        <xsl:when test="$score &gt; 48">
            <xsl:value-of select="94"/>
        </xsl:when>
        <xsl:otherwise>
            <xsl:value-of select="$score"/>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>


</xsl:stylesheet>