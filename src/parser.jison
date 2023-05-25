%lex

%%

"/*"(.|\r|\n)*?"*/"          { /* skip comments */ }
"//".*($|\r\n|\r|\n)         { /* skip comments */ }
\s+                          { /* skip whitespace */ }
"true"|"TRUE"                { return 'TRUE'; }
"false"|"FALSE"              { return 'FALSE'; }
"and"|"AND"                  { return 'AND'; }
"or"|"OR"                    { return 'OR'; }
"not"|"NOT"                  { return 'NOT'; }
"=~"                         { return '=~'; }
"!~"                         { return '!~'; }
"="                          { return '='; }
"!="                         { return '!='; }
"<="                         { return '<='; }
">="                         { return '>='; }
"<"                          { return '<'; }
">"                          { return '>'; }
"+"                          { return '+'; }
"-"                          { return '-'; }
"*"                          { return '*'; }
"/"                          { return '/'; }
"%"                          { return '%'; }
"in"|"IN"                    { return 'IN'; }
"like"|"LIKE"                { return 'LIKE'; }
[0-9]+(\.[0-9]+)?            { return 'NUMBER'; }
"null"                       { return 'NULL'; }
"undefined"                  { return 'UNDEFINED'; }
\"[^\"]*\"                   { return 'STRING'; }
[A-Za-z_$][A-Za-z0-9_]*      { return 'IDENTIFIER'; }
"("                          { return '('; }
")"                          { return ')'; }
"["                          { return '['; }
"]"                          { return ']'; }
","                          { return ','; }
"."                          { return '.'; }
<<EOF>>                      { return 'EOF'; }

/lex

%left AND OR
%left NOT
%left '=' '!=' '=~' '!~'
%left '<' '<=' '>' '>='
%left '+' '-'
%left '*' '/' '%'

%start expr_list

%%

expr_list
  : expr EOF { return $1; }
  ;

expr
  : expr AND expr { $$ = $1 + " && " + $3; }
  | expr OR expr { $$ = $1 + " || " + $3; }
  | NOT expr { $$ = "!" + $2; }
  | '(' expr ')' { $$ = $1 + $2 + $3; }
  | predicate
  | value
  ;

predicate
  : expr '=' expr { $$ = $1 + "===" + $3; }
  | expr '!=' expr { $$ = $1 + "!==" + $3; }
  | expr '<=' expr { $$ = $1 + $2 + $3; }
  | expr '>=' expr { $$ = $1 + $2 + $3; }
  | expr '<' expr { $$ = $1 + $2 + $3; }
  | expr '>' expr { $$ = $1 + $2 + $3; }
  | expr '+' expr { $$ = $1 + $2 + $3; }
  | expr '-' expr { $$ = $1 + $2 + $3; }
  | expr '*' expr { $$ = $1 + $2 + $3; }
  | expr '/' expr { $$ = $1 + $2 + $3; }
  | expr '%' expr { $$ = $1 + $2 + $3; }
  | value IN value { $$ = "_helpers['has'](" + $3 + "," + $1 + ")"; }
  | value NOT IN value { $$ = "!_helpers['has'](" + $4 + "," + $1 + ")"; }
  | value LIKE value { $$ = "_helpers['like'](" + $1 + "," + $3 + ")"; }
  | value NOT LIKE value { $$ = "!_helpers['like'](" + $1 + "," + $4 + ")"; }
  | value '=~' STRING { $$ = "_helpers['match'](" + $1 + "," + JSON.stringify($3.substr(1, $3.length - 2)) + ")"; }
  | value '!~' STRING { $$ = "!_helpers['match'](" + $1 + "," + JSON.stringify($3.substr(1, $3.length - 2)) + ")"; }
  ;

value
  : number_literal
  | null_literal
  | undefined_literal
  | bool_literal
  | string_literal
  | array_literal
  | variable
  | function
  ;

value_list
  : value
  | value_list ',' value { $$ = $1 + $2 + $3; }
  ;

null_literal
  : 'NULL' { $$ = null; }
  ;

undefined_literal
  : 'UNDEFINED' { $$ = undefined; }
  ;

number_literal
  : NUMBER { $$ = Number(yytext); }
  ;

bool_literal
  : TRUE { $$ = "true"; }
  | FALSE { $$ = "false"; }
  ;

string_literal
  : STRING { $$ = yytext; }
  ;

array_literal
  : '[' ']' { $$ = $1 + $2; }
  | '[' value_list ']' { $$ = $1 + $2 + $3; }
  ;

variable
  : IDENTIFIER { $$ = "_context." + yytext; }
  | variable '.' IDENTIFIER { $$ = "(" + $1 + "||{})." + $3; }
  | variable '[' value ']' { $$ = "(" + $1 + "||{})[" + $3 + "]"; }
  ;

function
  : IDENTIFIER '(' value_list ')' { $$ = "_context['" + $1 + "']" + $2 + $3 + $4; }
  ;

%%
