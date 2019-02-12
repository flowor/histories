;(function() {

    let memory = {
        x: { value: 0 },
        y: { value: 0 },
        
        print: function() {
            document.write(`x = ${memory.x.value}, y = ${memory.y.value}<br>`)
        },
        
        init: function() {
            this.x.value = 0;
            this.y.value = 0;
        }
    };

    let registers = {
        r1: { value: 0 },
        r2: { value: 0 },
        r3: { value: 0 },
        r4: { value: 0 },
        r5: { value: 0 },
        r6: { value: 0 },
        r7: { value: 0 },
        r8: { value: 0 },
    };

    // LOAD from memory into register
    function load(m, r) {
        r.value = m.value;
    }

    // ALU (Immediate Value)
    function alui(op, val, r) {
        switch(op) {
            case '+':
                r.value = r.value + val;
                break;

            case '-':
                r.value = r.value - val;
                break;
        }
    }

    // ALU (register + register)
    function alu(op, r1, r2) {
        switch(op) {
            case '+':
                r2.value = r1.value + r2.value;
                break;

            case '-':
                r2.value = r1.value - r2.value;
                break;
        }
    }

    // STORE (From register to memory)
    function store(r, m) {
        m.value = r.value;
    }

    
    // ------- DEFINE STATEMENTS -------
    // A statement is an array of atomic actions
    
    let A = [
        // x=x+1;
        {name: 'A1', execute: function() { load(memory.x, registers.r1) }},   // Load x from memory into register 1
        {name: 'A2', execute: function() { alui('+', 1, registers.r1)  }},    // ADD 1 to register r1's value and set it to r1
        {name: 'A3', execute: function() { store(registers.r1, memory.x) }},  // Store r1 into x
        
        // x=x+2; 
        {name: 'A4', execute: function() { load(memory.x, registers.r1) }},   // Load x from memory into register 1
        {name: 'A5', execute: function() { alui('+', 2, registers.r1)  }},    // ADD 2 to register r1's value and set it to r1
        {name: 'A6', execute: function() { store(registers.r1, memory.x) }},  // Store r1 into x
    ];

    let B = [
        // x=x+2;
        {name: 'B1', execute: function() { load(memory.x, registers.r2) }},  // Load x from memory into register 2
        {name: 'B2', execute: function() { alui('+', 2, registers.r2) }},    // ADD 2 to register r1's value and set it to r2
        {name: 'B3', execute: function() { store(registers.r2, memory.x) }}, // Store r2 into x

        // y=y-x;
        {name: 'B4', execute: function() { load(memory.y, registers.r2) }},          // Load y from memory into register 2
        {name: 'B5', execute: function() { load(memory.x, registers.r3) }},          // Load x from memory into register 3
        {name: 'B6', execute: function() { alu('-', registers.r2, registers.r3) }},  // SUBTRACT r3(x) from r2(y) and set it to r3
        {name: 'B7', execute: function() { store(registers.r3, memory.y) }},         // Store r3 into y
    ];


    // ------- DEFINE EXECUTION SEQUENCE -------

    // Program is an array of atomic actions
    let p1 = [ A[0], A[1], A[2], A[3], A[4], A[5], B[0], B[1], B[2], B[3], B[4], B[5], B[6] ];
    let p2 = [ A[0], A[1], A[2], B[0], B[1], B[2], B[3], B[4], B[5], B[6], A[3], A[4], A[5] ];
    let p3 = [ B[0], B[1], B[2], B[3], B[4], B[5], B[6], A[0], A[1], A[2], A[3], A[4], A[5] ];

    let p4 = [ A[0], B[0], B[1], B[2], A[1], A[2], A[3], A[4], A[5], B[3], B[4], B[5], B[6] ];
    let p5 = [ A[0], B[0], A[1], A[2], B[1], B[2], A[3], A[4], A[5], B[3], B[4], B[5], B[6] ];
    let p6 = [ A[0], B[0], A[1], A[2], B[1], B[2], B[3], B[4], B[5], B[6], A[3], A[4], A[5] ];
    let p7 = [ A[0], B[0], B[1], B[2], A[1], A[2], B[3], B[4], B[5], B[6], A[3], A[4], A[5] ];


    function run(actions) {
        memory.init();
        runAtomic(actions);
        document.write(' -----> ')
        memory.print();
    }

    function runAtomic(statements) {
        statements.forEach(function(atomicAction, index) {
            index != 0 ? document.write(`->${atomicAction.name}`) : document.write(atomicAction.name);
            atomicAction.execute();
        });

        document.write('->')
    }

    run(p1);
    run(p2);
    run(p3);
    run(p4);
    run(p5);
    run(p6);
    run(p7);


})();