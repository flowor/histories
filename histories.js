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

    
    // ------- DEFINE PROGRAM -------

    // x=x+1;     
    let A1 = [
        function() { load(memory.x, registers.r1) },   // Load x from memory into register 1
        function() { alui('+', 1, registers.r1)  },    // ADD 1 to register r1's value and set it to r1
        function() { store(registers.r1, memory.x) },  // Store r1 into x
    ];


    // x=x+2;
    let A2 = [
        function() { load(memory.x, registers.r1) },   // Load x from memory into register 1
        function() { alui('+', 2, registers.r1)  },    // ADD 2 to register r1's value and set it to r1
        function() { store(registers.r1, memory.x) },  // Store r1 into x
    ];


    // x=x+2;
    let B1 = [
        function() { load(memory.x, registers.r2) },  // Load x from memory into register 2
        function() { alui('+', 2, registers.r2) },    // ADD 2 to register r1's value and set it to r2
        function() { store(registers.r2, memory.x) }, // Store r2 into x
    ];
    
    // y=y-x;
    let B2 = [
        function() { load(memory.y, registers.r2) },          // Load y from memory into register 2
        function() { load(memory.x, registers.r3) },          // Load x from memory into register 3
        function() { alu('-', registers.r2, registers.r3) },  // SUBTRACT r3(x) from r2(y) and set it to r3
        function() { store(registers.r3, memory.y) },         // Store r3 into y
    ];


    // ------- EXECUTE PROGRAM -------

    function run(program) {
        memory.init();
        program.forEach(runAtomic);
        memory.print();

        function runAtomic(funcArr) {
            funcArr.forEach(action => action());
        }
    }

    function runParallel(program) {
        memory.init();
        program.forEach(action => action());
        memory.print();
    }

    document.write('A1 -> A2 -> B1 -> B2 ----> ')
    run([A1, A2, B1, B2]);
    
    document.write('A1 -> B1 -> A2 -> B2 ----> ')
    run([A1, B1, A2, B2]);

    document.write('A1 -> B1 -> B2 -> A2 ----> ')
    run([A1, B1, B2, A2]);

    document.write('B1 -> B2 -> A1 -> A2 ----> ')
    run([B1, B2, A1, A2]);

    document.write('B1 -> A1 -> B2 -> A2 ----> ')
    run([B1, A1, B2, A2]);

    document.write('B1 -> A1 -> A2 -> B2 ----> ')
    run([B1, A1, A2, B2]);

    document.write('A1[0], A1[1], A1[2], A2[0], A2[1], A2[2],  B1[0], B1[1], B1[2], B2[0], B2[1], B2[2], B2[3] ----> ')
    runParallel([A1[0], A1[1], A1[2], A2[0], A2[1], A2[2],  B1[0], B1[1], B1[2], B2[0], B2[1], B2[2], B2[3]]);
    


})();