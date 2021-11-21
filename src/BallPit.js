import { useEffect, useRef } from 'react'
import { Engine, Render, Runner, Composites, MouseConstraint, Mouse, Composite, Bodies } from 'matter-js'
import { getLetters } from './Lyrics'

const BallPit = () => {
    const scene = useRef()

    useEffect(() => {
        // create engine
        const engine = Engine.create(),
            world = engine.world;
        const render = Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: 800,
                height: 600,
                wireframes: false,
                background: 'white',
            }
        });
        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        Object.entries(getLetters()).forEach(group => {
            const letter = group[0]
            const count = group[1]
            const stack = Composites.stack(400, 0, 1, count, 0, 0, function (x, y) {
                var path = `letters/${letter}.png`
                if (letter.match(/[A-Z]/g)) {
                    path = `letters/uppercase/${letter.toLowerCase()}.png`
                }
                return Bodies.circle(x, y, 20, {
                    render: {
                        sprite: {
                            texture: path,
                            xScale: .3,
                            yScale: .3,
                        }
                    }
                })
            });
            Composite.add(world, stack);
        })

        Composite.add(world, [
            // walls
            Bodies.rectangle(400, 0, 800, 150, { isStatic: true }),
            Bodies.rectangle(400, 950, 50, 50, { isStatic: false }),
            Bodies.rectangle(400, 1000, 800, 150, { isStatic: true }),
            Bodies.rectangle(750, 500, 120, 1600, { isStatic: true }),
            Bodies.rectangle(50, 500, 120, 1600, { isStatic: true })
        ]);

        const mouse = Mouse.create(render.canvas),
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
        render.mouse = mouse;
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: 800, y: 1000 }
        });

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
