const modules = require('./eventBus');


describe("Testing EventBus", ()=> {
    beforeEach(()=>{
        ins = new modules.EventBus();
    })

    test('The instance should be able to call new() on EventBus', () => {
        expect(ins).toBeTruthy();
    });

    test('The instance should have Class methods', () => {

        expect(ins.on).toBeDefined()
        expect(ins.emit).toBeDefined()
    });


    test('Check function validate with correct parameters', () => {

        let a = ins.validate("str", {}, "string", "object");
        expect(a).toBe(true)
    });

    test('Check function validate with incorrect parameters', () => {

        try{
            ins.validate("str", 1, "string", "object");
        }catch (e){
            expect(e.message).toMatch("Bad input parameters");
        }
    });

    test('Listener is added to the container', () => {

        let name = "SomeName";
        ins.on(name, (data) => {
            console.log('Some Text');
            console.log(data);
        });

        expect(ins.listenersContainer.hasOwnProperty(name)).toBe(true);

    });

    test('Listeners with equal name are added to the container ', () => {

        let name = "SomeName";
        ins.on(name, (data) => {
            console.log('Some Text 1');
            console.log(data);
        });

        ins.on(name, (data) => {
            console.log('Some Text 2');
            console.log(data);
        });
        expect(ins.listenersContainer[name].length).toEqual(2);
    });

    test('Listeners with different names are added to the container', () => {

        let name1 = "SomeName 1";
        ins.on(name1, (data) => {
            console.log('Some Text 1');
            console.log(data);
        });

        let name2 = "SomeName 2";
        ins.on(name2, (data) => {
            console.log('Some Text 2');
            console.log(data);
        });

        expect(
            ins.listenersContainer.hasOwnProperty(name1) &&
            ins.listenersContainer.hasOwnProperty(name2)
        ).toBe(true);
    });

    test("check emit with name, that are not in container", ()=> {

        expect(ins.emit("sameName",{ key: 'value' })).toBe(false);
    })

    test("check emit function call listener", ()=>{

        let exfunc = jest.fn((data)=>{
            console.log('executor call');
            console.log(data);
        })

        ins.on('testName', exfunc);
        ins.emit('testName',{testName:"data"})

        expect(exfunc).toBeCalled()
        expect(exfunc).toBeCalledTimes(1)

    })

    test("Test removing listeners function",()=>{
        let exfunc = jest.fn((data)=>{
            console.log('executor call');
            console.log(data);
        })

        ins.on('testName', exfunc);
        ins.removeListener('testName');
        expect(ins.listenersContainer.hasOwnProperty("testName")).toBe(false);

    })
})










