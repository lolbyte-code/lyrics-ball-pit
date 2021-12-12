import { useEffect, useRef } from 'react'
import { Engine, Render, Runner, Composites, MouseConstraint, Mouse, Composite, Bodies } from 'matter-js'

const PhysicsImpl = (props) => {
  const scene = useRef()

  useEffect(() => {
    const engine = Engine.create()
    const world = engine.world
    const render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: 'white',
      }
    })
    Render.run(render)
    const runner = Runner.create()
    Runner.run(runner, engine)

    Object.entries(groupBy(props.letters)).forEach(group => {
      const letter = group[0]
      const count = group[1]
      const stack = Composites.stack(100, 0, 1, count, 0, 0, function (x, y) {
        var path = `letters/${letter}.png`
        if (letter.match(/[A-Z]/g)) {
          path = `letters/uppercase/${letter.toLowerCase()}.png`
        }
        return Bodies.circle(x, y, 20, {
          render: {
            sprite: {
              texture: path,
              xScale: props.letterScale,
              yScale: props.letterScale,
            }
          }
        })
      })
      Composite.add(world, stack)
    })

    const wallDepth = props.wallDepth
    const wallWidth = props.wallWidth

    Composite.add(world, [
      // top
      Bodies.rectangle(0, 0, wallWidth, wallDepth, { isStatic: true }),
      // bottom
      Bodies.rectangle(0, wallWidth, wallWidth, wallDepth, { isStatic: true }),
      // right
      Bodies.rectangle(wallWidth / 2, wallWidth / 2, wallDepth, wallWidth, { isStatic: true }),
      // left
      Bodies.rectangle(-(wallWidth / 4), wallWidth / 2, wallDepth, wallWidth, { isStatic: true }),
      // mixer
      Bodies.rectangle(0, 0, wallDepth, wallDepth, { isStatic: false })
    ])

    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    })
    Composite.add(world, mouseConstraint)
    render.mouse = mouse
    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: 800, y: 1000 }
    })

    return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function () {
        Render.stop(render)
        Runner.stop(runner)
      }
    }
  }, [props.letters, props.letterScale, props.wallDepth, props.wallWidth])

  return (
    <div ref={scene} style={{ width: '100%', height: '100%' }} />
  )
}

const groupBy = (arr) => {
  return arr.reduce((acc, obj) => {
    const key = obj
    if (!acc[key]) {
      acc[key] = 0
    }
    acc[key]++
    return acc
  }, {})
}

export default PhysicsImpl
