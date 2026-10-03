const items = $input.all();

const MIN_SCORE = 0.35;

const relevant = items.filter(item => {
  const score = item.json.score ?? 0;
  return score >= MIN_SCORE;
});

const context = relevant
  .map((item, index) => {
    const content = item.json.document?.pageContent || '';
    const source = item.json.document?.metadata?.source || 'Unknown source';
    const score = item.json.score ?? '';

    return `Source ${index + 1}: ${source}
Similarity: ${score}

${content}`;
  })
  .join('\n\n---\n\n');

return [
  {
    json: {
      question: $('When chat message received').item.json.chatInput,
      context,
      hasContext: relevant.length > 0,
      retrievedCount: relevant.length
    }
  }
];
