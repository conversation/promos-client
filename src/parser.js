/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,3],$V1=[1,4],$V2=[1,20],$V3=[1,16],$V4=[1,17],$V5=[1,15],$V6=[1,18],$V7=[1,19],$V8=[1,21],$V9=[1,22],$Va=[1,24],$Vb=[1,25],$Vc=[1,26],$Vd=[1,27],$Ve=[1,28],$Vf=[1,29],$Vg=[1,30],$Vh=[1,31],$Vi=[1,32],$Vj=[1,33],$Vk=[1,34],$Vl=[1,35],$Vm=[1,36],$Vn=[5,6,7,10,13,14,15,16,17,18,19,20,21,22,23],$Vo=[5,6,7,8,10,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,38,45],$Vp=[5,6,7,8,10,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,38,44,45,47],$Vq=[5,6,7,10],$Vr=[1,73],$Vs=[10,38,45],$Vt=[5,6,7,10,13,14],$Vu=[5,6,7,10,13,14,15,16,17,18],$Vv=[5,6,7,10,13,14,15,16,17,18,19,20];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"expr_list":3,"expr":4,"EOF":5,"AND":6,"OR":7,"NOT":8,"(":9,")":10,"predicate":11,"value":12,"=":13,"!=":14,"<=":15,">=":16,"<":17,">":18,"+":19,"-":20,"*":21,"/":22,"%":23,"IN":24,"LIKE":25,"=~":26,"STRING":27,"!~":28,"number_literal":29,"null_literal":30,"undefined_literal":31,"bool_literal":32,"string_literal":33,"array_literal":34,"variable":35,"function":36,"value_list":37,",":38,"NULL":39,"UNDEFINED":40,"NUMBER":41,"TRUE":42,"FALSE":43,"[":44,"]":45,"IDENTIFIER":46,".":47,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"AND",7:"OR",8:"NOT",9:"(",10:")",13:"=",14:"!=",15:"<=",16:">=",17:"<",18:">",19:"+",20:"-",21:"*",22:"/",23:"%",24:"IN",25:"LIKE",26:"=~",27:"STRING",28:"!~",38:",",39:"NULL",40:"UNDEFINED",41:"NUMBER",42:"TRUE",43:"FALSE",44:"[",45:"]",46:"IDENTIFIER",47:"."},
productions_: [0,[3,2],[4,3],[4,3],[4,2],[4,3],[4,1],[4,1],[11,3],[11,3],[11,3],[11,3],[11,3],[11,3],[11,3],[11,3],[11,3],[11,3],[11,3],[11,3],[11,4],[11,3],[11,4],[11,3],[11,3],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[37,1],[37,3],[30,1],[31,1],[29,1],[32,1],[32,1],[33,1],[34,2],[34,3],[35,1],[35,3],[35,4],[36,4]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0-1]; 
break;
case 2:
 this.$ = $$[$0-2] + " && " + $$[$0]; 
break;
case 3:
 this.$ = $$[$0-2] + " || " + $$[$0]; 
break;
case 4:
 this.$ = "!" + $$[$0]; 
break;
case 5: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17: case 18: case 34: case 42:
 this.$ = $$[$0-2] + $$[$0-1] + $$[$0]; 
break;
case 8:
 this.$ = $$[$0-2] + "===" + $$[$0]; 
break;
case 9:
 this.$ = $$[$0-2] + "!==" + $$[$0]; 
break;
case 19:
 this.$ = "_helpers['has'](" + $$[$0] + "," + $$[$0-2] + ")"; 
break;
case 20:
 this.$ = "!_helpers['has'](" + $$[$0] + "," + $$[$0-3] + ")"; 
break;
case 21:
 this.$ = "_helpers['like'](" + $$[$0-2] + "," + $$[$0] + ")"; 
break;
case 22:
 this.$ = "!_helpers['like'](" + $$[$0-3] + "," + $$[$0] + ")"; 
break;
case 23:
 this.$ = "_helpers['match'](" + $$[$0-2] + "," + JSON.stringify($$[$0].substr(1, $$[$0].length - 2)) + ")"; 
break;
case 24:
 this.$ = "!_helpers['match'](" + $$[$0-2] + "," + JSON.stringify($$[$0].substr(1, $$[$0].length - 2)) + ")"; 
break;
case 35:
 this.$ = null; 
break;
case 36:
 this.$ = undefined; 
break;
case 37:
 this.$ = Number(yytext); 
break;
case 38:
 this.$ = "true"; 
break;
case 39:
 this.$ = "false"; 
break;
case 40:
 this.$ = yytext; 
break;
case 41:
 this.$ = $$[$0-1] + $$[$0]; 
break;
case 43:
 this.$ = "_context." + yytext; 
break;
case 44:
 this.$ = "(" + $$[$0-2] + "||{})." + $$[$0]; 
break;
case 45:
 this.$ = "(" + $$[$0-3] + "||{})[" + $$[$0-1] + "]"; 
break;
case 46:
 this.$ = "_context['" + $$[$0-3] + "']" + $$[$0-2] + $$[$0-1] + $$[$0]; 
break;
}
},
table: [{3:1,4:2,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{1:[3]},{5:[1,23],6:$Va,7:$Vb,13:$Vc,14:$Vd,15:$Ve,16:$Vf,17:$Vg,18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm},{4:37,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{4:38,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},o($Vn,[2,6]),o($Vn,[2,7],{8:[1,40],24:[1,39],25:[1,41],26:[1,42],28:[1,43]}),o($Vo,[2,25]),o($Vo,[2,26]),o($Vo,[2,27]),o($Vo,[2,28]),o($Vo,[2,29]),o($Vo,[2,30]),o($Vo,[2,31],{44:[1,45],47:[1,44]}),o($Vo,[2,32]),o($Vo,[2,37]),o($Vo,[2,35]),o($Vo,[2,36]),o($Vo,[2,38]),o($Vo,[2,39]),o($Vo,[2,40]),{12:48,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,37:47,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,45:[1,46],46:$V9},o($Vp,[2,43],{9:[1,49]}),{1:[2,1]},{4:50,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{4:51,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{4:52,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{4:53,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{4:54,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{4:55,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{4:56,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{4:57,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{4:58,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{4:59,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{4:60,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{4:61,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{4:62,8:$V0,9:$V1,11:5,12:6,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},o($Vq,[2,4],{13:$Vc,14:$Vd,15:$Ve,16:$Vf,17:$Vg,18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),{6:$Va,7:$Vb,10:[1,63],13:$Vc,14:$Vd,15:$Ve,16:$Vf,17:$Vg,18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm},{12:64,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{24:[1,65],25:[1,66]},{12:67,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{27:[1,68]},{27:[1,69]},{46:[1,70]},{12:71,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},o($Vo,[2,41]),{38:$Vr,45:[1,72]},o($Vs,[2,33]),{12:48,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,37:74,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},o($Vq,[2,2],{13:$Vc,14:$Vd,15:$Ve,16:$Vf,17:$Vg,18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),o($Vq,[2,3],{13:$Vc,14:$Vd,15:$Ve,16:$Vf,17:$Vg,18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),o($Vt,[2,8],{15:$Ve,16:$Vf,17:$Vg,18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),o($Vt,[2,9],{15:$Ve,16:$Vf,17:$Vg,18:$Vh,19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),o($Vu,[2,10],{19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),o($Vu,[2,11],{19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),o($Vu,[2,12],{19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),o($Vu,[2,13],{19:$Vi,20:$Vj,21:$Vk,22:$Vl,23:$Vm}),o($Vv,[2,14],{21:$Vk,22:$Vl,23:$Vm}),o($Vv,[2,15],{21:$Vk,22:$Vl,23:$Vm}),o($Vn,[2,16]),o($Vn,[2,17]),o($Vn,[2,18]),o($Vn,[2,5]),o($Vn,[2,19]),{12:75,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{12:76,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},o($Vn,[2,21]),o($Vn,[2,23]),o($Vn,[2,24]),o($Vp,[2,44]),{45:[1,77]},o($Vo,[2,42]),{12:78,27:$V2,29:7,30:8,31:9,32:10,33:11,34:12,35:13,36:14,39:$V3,40:$V4,41:$V5,42:$V6,43:$V7,44:$V8,46:$V9},{10:[1,79],38:$Vr},o($Vn,[2,20]),o($Vn,[2,22]),o($Vp,[2,45]),o($Vs,[2,34]),o($Vo,[2,46])],
defaultActions: {23:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0: /* skip comments */ 
break;
case 1: /* skip comments */ 
break;
case 2: /* skip whitespace */ 
break;
case 3: return 42; 
break;
case 4: return 43; 
break;
case 5: return 6; 
break;
case 6: return 7; 
break;
case 7: return 8; 
break;
case 8: return 26; 
break;
case 9: return 28; 
break;
case 10: return 13; 
break;
case 11: return 14; 
break;
case 12: return 15; 
break;
case 13: return 16; 
break;
case 14: return 17; 
break;
case 15: return 18; 
break;
case 16: return 19; 
break;
case 17: return 20; 
break;
case 18: return 21; 
break;
case 19: return 22; 
break;
case 20: return 23; 
break;
case 21: return 24; 
break;
case 22: return 25; 
break;
case 23: return 41; 
break;
case 24: return 39; 
break;
case 25: return 40; 
break;
case 26: return 27; 
break;
case 27: return 46; 
break;
case 28: return 9; 
break;
case 29: return 10; 
break;
case 30: return 44; 
break;
case 31: return 45; 
break;
case 32: return 38; 
break;
case 33: return 47; 
break;
case 34: return 5; 
break;
}
},
rules: [/^(?:\/\*(.|\r|\n)*?\*\/)/,/^(?:\/\/.*($|\r\n|\r|\n))/,/^(?:\s+)/,/^(?:true|TRUE\b)/,/^(?:false|FALSE\b)/,/^(?:and|AND\b)/,/^(?:or|OR\b)/,/^(?:not|NOT\b)/,/^(?:=~)/,/^(?:!~)/,/^(?:=)/,/^(?:!=)/,/^(?:<=)/,/^(?:>=)/,/^(?:<)/,/^(?:>)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:in|IN\b)/,/^(?:like|LIKE\b)/,/^(?:[0-9]+(\.[0-9]+)?)/,/^(?:null\b)/,/^(?:undefined\b)/,/^(?:"[^\"]*")/,/^(?:[A-Za-z_$][A-Za-z0-9_]*)/,/^(?:\()/,/^(?:\))/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?:\.)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}