async function main () {
  for await (const chunk of process.stdin) {
    console.log('New data available')
    console.log(
      `Chunk read (${chunk.length} bytes): "${chunk.toString()}"`
    )
  }
  console.log('End of stream')
}

main()
