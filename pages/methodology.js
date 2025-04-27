export default function Methodology() {
    return (
      <section>
        <h1>Methodology</h1>
        <ul>
          <li>Data Collection: OCR’d Mississippi community cookbooks (McCain Library)</li>
          <li>Modeling: Fine-tuned GPT-Neo on cleaned corpus + on-the-fly OpenAI inference</li>
          <li>Evaluation: Ingredient overlap metrics & expert panel reviews on key dishes</li>
        </ul>
      </section>
    )
  }
  