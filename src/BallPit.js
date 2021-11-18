import { useEffect, useRef } from 'react'
import { Engine, Render, Runner, Composites, MouseConstraint, Mouse, Composite, Bodies } from 'matter-js'

const BallPit = () => {
    const scene = useRef()

    useEffect(() => {
        // create engine
        var engine = Engine.create(),
            world = engine.world;

        // create renderer
        var render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: 800,
                height: 600,
                wireframes: false,
            }
        });

        Render.run(render);

        // create runner
        var runner = Runner.create();
        Runner.run(runner, engine);

        // add bodies
        var stack = Composites.stack(20, 20, 100, 5, 0, 0, function (x, y) {

            return Bodies.circle(x, y, 15, {
                render: {
                    // fillStyle: 'white',
                    // strokeStyle: 'black',
                    // lineWidth: 1,
                    // text: {
                    //     content: letters[Math.floor(Math.random()*letters.length)],
                    //     color: "white",
                    //     size: 50,
                    // },
                    sprite: {
                        texture: 'letters/b.png',
                        xScale: .055,
                        yScale: .055,
                    }
                }
            })
        });

        Composite.add(world, stack);

        Composite.add(world, [
            // walls
            Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
            Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
            Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
            Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
        ]);

        // add mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

        Composite.add(world, mouseConstraint);

        // keep the mouse in sync with rendering
        render.mouse = mouse;

        // fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 800, y: 600 }
        });

        // context for MatterTools.Demo
        return {
            engine: engine,
            runner: runner,
            render: render,
            canvas: render.canvas,
            stop: function () {
                Render.stop(render);
                Runner.stop(runner);
            }
        };
    }, [])

    return (
        <div ref={scene} style={{ width: '100%', height: '100%' }} />
    )
}

export default BallPit
