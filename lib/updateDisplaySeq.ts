const updateDisplaySeq = <T>(items: T[]): T[] => {
  return items.map((item, index) => {
    return { ...item, display_seq: index + 1 };
  });
};

export default updateDisplaySeq;
