/* lexical grammar */
%lex
%%
"/*"(.|\r|\n)*?"*/"          {/* skip comments*/}
"//".*($|\r\n|\r|\n)         {/* skip comments*/}
\s+                          {/* skip whitespace */}
"true"|"TRUE"                {return 'TRUE';}
"false"|"FALSE"              {return 'FALSE';}
"and"|"AND"                  {return 'AND';}
"or"|"OR"                    {return 'OR';}
"not"|"NOT"                  {return 'NOT';}
"=~"                         {return '=~';}
"!~"                         {return '!~';}
"="                          {return '=';}
"!="                         {return '!=';}
"<="                         {return '<=';}
">="                         {return '>=';}
"<"                          {return '<';}
">"                          {return '>';}
"contains"|"CONTAINS"        {return 'CONTAINS';}
"like"|"LIKE"                {return 'LIKE';}
[\-]?[0-9]+                  {return 'INTEGER';}
\"[^\"]*\"                   {return 'STRING';}
[A-Za-z_$]([A-Za-z0-9_$]+)*  {return 'VAR';}
"("                          {return '(';}
")"                          {return ')';}
"["                          {return '[';}
"]"                          {return ']';}
","                          {return ',';}
"."                          {return '.';}
<<EOF>>                      {return 'EOF';}

/lex

/* operator associations and precedence */

%left DOT
%left '=' '!=' '=~' '!~'
%left '<=' '>=' '<' '>'
%left AND OR
%left NOT
%left CONTAINS LIKE

%start expressions

%% /* language grammar */

expressions
    : e EOF
        %{ return ($1.length >= exports.MIN_GZIP_SIZE) ? "GZ:" + require('zlib').gzipSync(new Buffer(""+$1)).toString('base64') : $1; }
    ;
e
    : TRUE
        {$$ = "true";}
    | FALSE
        {$$ = "false";}
    | NOT e
        {$$ = "!" + $2;}
    | '(' e ')'
        {$$ = "(" + $2 + ")";}
    | e AND e
        {$$ = $1 + " && " + $3;}
    | e OR e
        {$$ = $1 + " || " + $3;}
    | value '=' value
        {$$ = $1 + "==" + $3;}
    | value '!=' value
        {$$ = $1 + "!=" + $3;}
    | value '<=' value
        {$$ = $1 + $2 + $3}
    | value '>=' value
        {$$ = $1 + $2 + $3}
    | value '<' value
        {$$ = $1 + $2 + $3}
    | value '>' value
        {$$ = $1 + $2 + $3}
    | arrayvalue CONTAINS value
        {$$ = "_helpers['idxof'](" + $1 + "," + $3 + ")"; }
    | value CONTAINS value
        {$$ = "_helpers['idxof'](" + $1 + "," + $3 + ")"; }
    | value LIKE value
        {$$ = "_helpers['match'](" + $1 + "," + $3 + ")";}
    | value '=~' STRING
        {new RegExp($3.substr(1, $3.length - 2)); $$ = "_helpers['regex'](" + $1 + "," + JSON.stringify($3.substr(1, $3.length - 2)) + ")";}
    | value '!~' STRING
        {new RegExp($3.substr(1, $3.length - 2)); $$ = "!_helpers['regex'](" + $1 + "," + JSON.stringify($3.substr(1, $3.length - 2)) + ")";}
    | value
        {$$ = $1;}
    ;
arrayitems
    : INTEGER
        {$$ = $1;}
    | STRING
        {$$ = $1;}
    | arrayitems ',' INTEGER
        {$$ = $1+$2+$3;}
    | arrayitems ',' STRING
        {$$ = $1+$2+$3;}
    ;
arrayvalue
    : '[' ']'
        {$$ = $1+$2;}
    | '[' arrayitems ']'
        {$$ = $1+$2+$3;}
    ;
value
    : INTEGER
        {$$ = Number(yytext);}
    | STRING
        {$$ = yytext;}
    | variable
        {$$ = $1;}
    ;
variable
    : VAR
        {$$ = "_env." + yytext;}
    | variable '.' VAR
        {$$ = "(" + $1 + "||{})." + $3;}
    ;

%%

MIN_GZIP_SIZE = exports.MIN_GZIP_SIZE = Infinity;
