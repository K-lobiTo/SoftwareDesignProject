describe('Simple Test Suite', () => {
  test('basic test', () => {
    expect(true).toBe(true);
  });

  test('string operations', () => {
    expect('hello world').toContain('world');
    expect('hello world').toHaveLength(11);
  });

  test('math operations', () => {
    expect(1 + 1).toBe(2);
    expect(5 * 5).toBe(25);
  });

  test('array operations', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(arr).toHaveLength(5);
    expect(arr).toContain(3);
    expect(arr.map(x => x * 2)).toEqual([2, 4, 6, 8, 10]);
  });

  test('object operations', () => {
    const obj = { name: 'test', value: 42 };
    expect(obj).toHaveProperty('name');
    expect(obj.value).toBe(42);
  });
});