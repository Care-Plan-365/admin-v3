type PlainObject = Record<string, unknown>;

const isPlainObject = (value: unknown): value is PlainObject => {
    return typeof value === "object" && value !== null && !Array.isArray(value);
};

export const normalizeEntityArray = <T>(
    payload: unknown,
    candidateKeys: readonly string[],
    errorMessage: string
): T[] => {
    if (Array.isArray(payload)) {
        return payload as T[];
    }

    if (!isPlainObject(payload)) {
        throw new Error(errorMessage);
    }

    const visited = new Set<PlainObject>();
    const stack: PlainObject[] = [payload];

    while (stack.length > 0) {
        const current = stack.pop()!;
        if (visited.has(current)) {
            continue;
        }
        visited.add(current);

        for (const key of candidateKeys) {
            if (!(key in current)) {
                continue;
            }

            const value = current[key];
            if (Array.isArray(value)) {
                return value as T[];
            }

            if (isPlainObject(value)) {
                stack.push(value);
            }
        }

        for (const value of Object.values(current)) {
            if (isPlainObject(value)) {
                stack.push(value);
            }
        }
    }

    throw new Error(errorMessage);
};
