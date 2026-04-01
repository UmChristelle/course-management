export function normalizeCourse(course) {
  if (!course) {
    return null;
  }

  return {
    id: course.id ?? course._id ?? '',
    courseName: course.courseName ?? course.name ?? '',
    description: course.description ?? '',
    supervisorId: course.supervisorId ?? null,
    createdAt: course.createdAt ?? null,
    updatedAt: course.updatedAt ?? null,
  };
}

export function normalizeCourseCollection(payload) {
  const source = Array.isArray(payload)
    ? payload
    : payload?.courses ?? payload?.data ?? payload?.items ?? [];

  return source.map(normalizeCourse).filter(Boolean);
}

export function buildCoursePayload(values) {
  return {
    courseName: values.courseName.trim(),
    description: values.description.trim(),
  };
}

export function formatDate(value) {
  if (!value) {
    return 'Not available';
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function initialsForCourse(courseName = '') {
  return courseName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment[0]?.toUpperCase() ?? '')
    .join('');
}

export function summarizeCourses(courses) {
  const total = courses.length;
  const recentlyUpdated = courses.filter((course) => {
    if (!course.updatedAt) {
      return false;
    }

    const updatedAt = new Date(course.updatedAt).getTime();
    const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
    return updatedAt >= threeDaysAgo;
  }).length;

  const ownedBySupervisor = courses.filter((course) => course.supervisorId).length;
  const averageDescriptionLength = total
    ? Math.round(
        courses.reduce((sum, course) => sum + course.description.length, 0) / total,
      )
    : 0;

  return {
    total,
    recentlyUpdated,
    ownedBySupervisor,
    averageDescriptionLength,
  };
}
